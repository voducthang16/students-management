import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="bg-white p-4 h-screen">
            <ul className="list-none text-lg font-raleway">
                <li>
                    <Link className="no-underline text-gray-700 font-medium" to={'/'}>
                        Students
                    </Link>
                </li>
                <li>
                    <Link className="no-underline text-gray-700 font-medium" to={'/task'}>
                        Tasks
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
