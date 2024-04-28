import { useEffect, useState } from 'react';

const PicturePage = () => {
    const API_URL = 'http://10.0.0.35:3001';
    
    useEffect(() => {
        fetch(`${API_URL}/picture`, {
            method: 'GET',
        })
            .then(response => response.blob())
            .then(pic => {
                let picURL = URL.createObjectURL(pic);
                document.getElementById('picture').src = picURL;
            })
            .catch( err => { console.log(err) })
    }, [])

    return (
        <div>
            <img id='picture' src='' alt='Mario' />
        </div>
    )
}

export default PicturePage;