const express = require('express');
const { generateImageController } = require('../controllers/generateImageController.js')


const router = express.Router();


router.post('/', generateImageController)


module.exports = router;