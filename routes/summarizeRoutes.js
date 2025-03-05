const express = require('express');
const { summarizeDocument } = require('../controllers/summarizeController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), summarizeDocument);

module.exports = router;
