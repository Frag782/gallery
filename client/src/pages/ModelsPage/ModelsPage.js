import { useEffect, useState } from 'react';
import PictureFrame from '../../components/PictureFrame/PictureFrame';

const ModelsPage = () => {
    const API_URL = 'http://10.0.0.35:3001';
    const [characters, setCharacters] = useState([]);
    const [charactersLoaded, setCharactersLoaded] = useState(false);
    
    useEffect(() => {
        fetch(`${API_URL}/characters`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setCharacters(data);

            const promises = data.map(character => 
                fetch(`${API_URL}/thumbnail/${character.name}`)
                .then(response => response.blob())
                .then(image => URL.createObjectURL(image))
                .then(url => ({ ...character, thumbnail: url }))
            );

            Promise.all(promises)
            .then(charactersWithThumbnails => {
                setCharacters(charactersWithThumbnails);
                setCharactersLoaded(true);
            });
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div id='models-container'>
            {charactersLoaded ? (
                characters.map(character => (
                    <PictureFrame key={character.name} name={character.name} path={character.thumbnail} />
                ))) 
                : (
                    <p>Loading...</p>
                )}
        </div>
    );
}

export default ModelsPage;
