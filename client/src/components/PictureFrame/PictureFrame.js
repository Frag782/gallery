import './PictureFrame.css'

const PictureFrame = ( props ) => {

    return (
        <div className='picture-frame' onClick={props.onClick}>
            { props.name && <h3>{props.name}</h3> }
            <img src={props.path} alt={props.name} />
        </div>
    )
}

export default PictureFrame;