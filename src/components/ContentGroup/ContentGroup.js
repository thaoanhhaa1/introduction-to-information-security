const ContentGroup = ({ children }) => {
    return (
        <div className="flex flex-wrap gap-4 p-4 max-w-5xl w-full mx-auto mt-[var(--header-height)]">
            {children[0]}
            <div className="w-[1px] bg-black"></div>
            {children[1]}
        </div>
    );
};

export default ContentGroup;
