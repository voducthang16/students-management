import { CloseOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Link, NavLink } from 'react-router-dom';
import { sidebar, toggleSidebar } from 'store/slice/loading.slice';

function Sidebar() {
    const dispatch = useAppDispatch();
    const isSidebar = useAppSelector(sidebar);
    return (
        <aside className={`bg-[#405189] fixed top-0 bottom-0 w-64 p-4 z-10 ${isSidebar ? 'hidden' : ''} lg:block`}>
            <span onClick={() => dispatch(toggleSidebar())} className="absolute top-3 right-3 lg:hidden">
                <CloseOutlined className="text-2xl" />
            </span>
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
