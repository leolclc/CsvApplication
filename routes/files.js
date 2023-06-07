const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/filesController');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), uploadFile);

module.exports = router;