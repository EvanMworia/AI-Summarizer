const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const axios = require('axios');

exports.summarizeDocument = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}

		let extractedText = '';

		// Identify file type
		const fileType = req.file.mimetype;

		if (fileType === 'application/pdf') {
			const data = await pdfParse(req.file.buffer);
			extractedText = data.text;
		} else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
			const result = await mammoth.extractRawText({ buffer: req.file.buffer });
			extractedText = result.value;
		} else if (fileType.startsWith('text/')) {
			extractedText = req.file.buffer.toString('utf-8');
		} else {
			return res.status(400).json({ error: 'Unsupported file format' });
		}

		if (!extractedText.trim()) {
			return res.status(400).json({ error: 'Could not extract text from file' });
		}

		// Send extracted text to OpenAI for summarization
		const summary = await getSummaryFromOpenAI(extractedText);

		res.json({ summary });
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// research on roles you can provide to ai
async function getSummaryFromOpenAI(text) {
	try {
		const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: 'Summarize the following text:' },
					{ role: 'user', content: text },
				],
				temperature: 0.5,
				max_tokens: 500,
			},
			{
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data.choices[0].message.content.trim();
	} catch (error) {
		console.error('Error calling OpenAI:', error.response?.data || error.message);
		return 'Error summarizing the document.';
	}
}
