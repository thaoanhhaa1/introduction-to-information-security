import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const HeaderItem = ({ children, navbar }) => {
    return (
        <div className="relative group">
            <div className="text-text-1 px-4 py-2 hover:text-primary transition-all cursor-pointer">
                {children}
            </div>
            {navbar && (
                <div className="group-hover:visible group-hover:opacity-100 opacity-0 invisible overflow-hidden absolute min-w-[200px] top-full right-0 bg-white rounded-lg shadow-md transition-all">
                    {navbar.map((item) => (
                        <Link
                            key={v4()}
                            className="block px-4 py-2 hover:text-primary hover:bg-text-4 hover:bg-opacity-10 transition-all"
                            to={item.to}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeaderItem;
