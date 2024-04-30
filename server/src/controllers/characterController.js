const config = require('../utils/config');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

// Character dirs as { name:string }[]
exports.getAll = (req, res) => {
    fsp.readdir(config.CHARACTERS_DIRECTORY)
        .then( (directories) => {
            return directories.map( (directory) => { return {'name': directory} });
        })
        .then( (data) => res.status(200).json(data))
        .catch( (error) => res.status(500).send(`ERREUR: ${error}`));
};

// Either thumbnail.* or first as string
exports.getThumbnail = (req, res) => {
    const characterName = req.params.name;
    const characterSubdir = path.join(config.CHARACTERS_DIRECTORY, characterName);

    fsp.readdir(characterSubdir)
        .then( (filenames) => {
            let thumbnail = filenames.find( (filename) => filename.split('.')[0] === 'thumbnail');
            return thumbnail ?? filenames[0];
        })
        .then( (filePath) => { res.status(200).sendFile(path.join(characterSubdir, filePath)); })
        .catch( (error) => { console.log(error); res.status(500).send(`ERREUR: ${error}`)})
}

// Files as string[]
exports.getFilenames = (req, res) => {
    const characterName = req.params.name;
    const characterSubdir = path.join(config.CHARACTERS_DIRECTORY, characterName);

    fsp.readdir(characterSubdir)
        .then( (filenames) => { res.status(200).json(filenames) })
        .catch( (error) => res.status(500).send(`ERREUR: ${error}`));
}

// File as blob
exports.getImage = (req, res) => {
    const {char: characterName, file: fileName} = req.query;
    
    const characterSubdir = path.join(config.CHARACTERS_DIRECTORY, characterName);

    fsp.readdir(characterSubdir)
        .then( (files) => {
            return files.find( (file) => file === fileName );
        })
        .then( (file) => {
            if (!file) res.status(400).send('Fichier introuvable');
            else res.status(200).sendFile(path.join( characterSubdir, fileName ));
        })
        .catch( (error) => {
            console.log(error);
            res.status(500).send(`Erreur lors de la recuperation d'images.`)
        });
}

/* @TODO:
* Changer getAll return type pour string[] - La creation d'objet se fera cote client
*/