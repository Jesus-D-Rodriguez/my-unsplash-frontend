function Image (props) {
    const {imageUrl} = props;

    return (
    <div>
        <img src={imageUrl} alt="imagen de internet" />
    </div>
    );

}

export default Image;