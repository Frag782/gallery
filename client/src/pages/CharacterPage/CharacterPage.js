import { useEffect, useState } from "react";
import PictureFrame from "../../components/PictureFrame/PictureFrame";

const CharacterPage = (props) => {
    const API_URL = 'http://10.0.0.35:3001';
    const [files, setFiles] = useState([]);
    const [filesLoaded, setFilesLoaded] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/character/image/${props.name}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((fileNames) => {
                setFiles(fileNames.map((fileName) => {
                    return { name: fileName, url: `${API_URL}/image?char=${props.name}&file=${fileName}` };
                }));
                setFilesLoaded(true); // Mettre à jour l'état filesLoaded une fois que les noms de fichiers ont été récupérés
            })
            .catch((error) => console.log(error));
    }, [props.name]);

    return (
        <div id='main-container'>
            {filesLoaded ? (
                files.map((file) => (
                    <PictureFrame key={file.name} path={file.url} />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CharacterPage;
