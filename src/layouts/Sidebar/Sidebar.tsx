import { Image } from 'antd';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="bg-[#405189] fixed top-0 bottom-0 w-64 p-4">
            <div className="flex py-4 justify-center">
                <Link className="flex justify-center" to={'/'}>
                    <Image src="/logo-light.png" width={'60%'} preview={false} />
                </Link>
            </div>
            <ul className="list-none text-lg font-raleway">
                <li className="py-2">
                    <NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            isActive ? 'text-white no-underline' : 'no-underline text-[#abb9e8]'
                        }
                    >
                        Students
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink
                        to={'/task'}
                        className={({ isActive }) =>
                            isActive ? 'text-white no-underline' : 'no-underline text-[#abb9e8]'
                        }
                    >
                        Tasks
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
