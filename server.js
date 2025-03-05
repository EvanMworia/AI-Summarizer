const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4200;

// Set up storage for uploaded files (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

// Test route
app.get('/', (req, res) => {
	res.send('AI Document Summarization API');
});

// Import Routes
const summarizeRoutes = require('./routes/summarizeRoutes');
app.use('/api/summarize', summarizeRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
