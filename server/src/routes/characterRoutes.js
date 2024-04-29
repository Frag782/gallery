const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/characters', (req, res) => {
    characterController.getAll(req, res);
});

router.get('/thumbnail/:name', (req, res) => {
    characterController.getThumbnail(req, res);
})

router.get('/character/images/:name', (req, res) => {
    characterController.getFilenames(req, res);
})

router.get('/image', (req, res) => {
    characterController.getImage(req, res);
})

module.exports = router;

