const Image = ({ src, alt }) => {
    return (
        <img className="w-full h-full object-cover" src={src} alt={alt}></img>
    );
};

export default Image;
