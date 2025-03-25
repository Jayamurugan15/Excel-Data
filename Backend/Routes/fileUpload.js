const express = require('express');
const router = express.Router()
const Uploader = require('../Middleware/Upload.js');
const {UploadFile,FetchData} = require('../controllers/FileController.js')

router.post('/upload', Uploader,UploadFile);
router.post('/get-data',FetchData);

module.exports = router;