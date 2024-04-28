const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/characters', (req, res) => {
    characterController.getAll()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(`ERREUR: ${error}`));
});

router.get('/thumbnail/:name', (req, res) => {
    characterController.getThumbnail(req.params.name)
        .then( path => {
            res.status(200).sendFile(path);
        })
        .catch( error => res.status(500).send(`ERREUR: ${error}`))
})

module.exports = router;