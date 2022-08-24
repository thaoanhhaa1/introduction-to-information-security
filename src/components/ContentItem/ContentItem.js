import Heading from '../Heading';

const ContentItem = ({ title, children }) => {
    return (
        <div className="w-full md:flex-1">
            <Heading>{title}</Heading>
            {children}
        </div>
    );
};

export default ContentItem;
