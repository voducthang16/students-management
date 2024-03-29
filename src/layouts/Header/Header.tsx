import { MenuOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import { useAppDispatch } from 'hooks';
import { toggleSidebar } from 'store/slice/loading.slice';

function Header() {
    const dispatch = useAppDispatch();
    return (
        <header className="bg-white px-4 h-20 flex justify-between lg:justify-end items-center border-0 border-b border-solid border-slate-200">
            <Button
                onClick={() => {
                    dispatch(toggleSidebar());
                }}
                className="flex items-center justify-center lg:hidden"
            >
                <MenuOutlined />
            </Button>
            <div className="space-x-2">
                <Image
                    src={
                        'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
                    }
                    alt={'AVATAR'}
                    className={'rounded-full w-full !h-full'}
                    rootClassName={'rounded-full h-14 w-14 p-0.5 border border-solid border-slate-200'}
                    fallback="https://imageio.forbes.com/specials-images/imageserve/63a590cfe96a4fea66cc7319/Venusian-Lake/0x0.jpg?format=jpg&crop=1625,914,x0,y484,safe&width=960"
                    preview={false}
                />
                <span className="font-source-sans-pro text-xl font-semibold">Vo Duc Thang</span>
            </div>
        </header>
    );
}

export default Header;
