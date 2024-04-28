const config = require('../utils/config');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const uuid = require('uuid');

/* Returns: Promise<character[]>
** character = {name:string, path:string, thumbnail:string}
*/
exports.getAll = () => {
    const allCharacters = [];

    const readModelDirectories = () => {
        return fsp.readdir(config.CHARACTERS_DIRECTORY)
            .then( (directories) => {
                const promises = directories.map(readCharacterDirectory);
                return Promise.all(promises)
                    .then(() => allCharacters);
            })
            .catch((error) => { throw error });
    };

    const readCharacterDirectory = (characterSubdir) => {
        const subdirPath = path.join(config.CHARACTERS_DIRECTORY, characterSubdir);

        return fsp.readdir(subdirPath)
            .then((characterFiles) => {
                const characterData = { 'name': characterSubdir };
                allCharacters.push(characterData);
            });
    };

    return readModelDirectories();
};

// => Promise path:string
exports.getThumbnail = (name) => {
    const characterSubdir = path.join(config.CHARACTERS_DIRECTORY, name);

    return fsp.readdir(characterSubdir)
        .then( (images) => {
            return path.join(characterSubdir, images[0]);
        })
}

// => Promise files:string[]
exports.getImages = (name) => {
    const characterSubdir = path.join(config.CHARACTERS_DIRECTORY, name);

    return fsp.readdir(characterSubdir)
        .then(files => {
            
        })
}

// => sendFile(path)
exports.getImage = (path) => {

}