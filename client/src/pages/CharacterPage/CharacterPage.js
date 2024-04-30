import { useEffect, useState } from "react";
import PictureFrame from "../../components/PictureFrame/PictureFrame";
import { useNavigate, useParams } from "react-router-dom";

const CharacterPage = (props) => {
    const API_URL = 'http://10.0.0.35:3001';
    const [files, setFiles] = useState([]);
    const [filesLoaded, setFilesLoaded] = useState(false);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/character/images/${name}`, {
            method: 'GET'
        })
            .then( (response) => response.json())
            .then( (fileNames) => {
                setFiles(fileNames.map((fileName) => {
                    return { name: fileName, url: `${API_URL}/image?char=${name}&file=${fileName}` };
                }));
                setFilesLoaded(true);
            })
            .catch( (error) => console.log(error));
    }, [name]);

    const toHome = () => { navigate('/') }

    return (
        <div id='main-container' className='mt-3'>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={ toHome }>Menu Principal</button>
            </div>

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
