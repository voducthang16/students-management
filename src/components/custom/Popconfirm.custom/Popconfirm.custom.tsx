import { Popconfirm } from 'antd';

interface IPopconfirmCustom {
    title: string;
    children: any;
    onConfirm: () => void;
}

function PopconfirmCustom({ title, children, onConfirm }: IPopconfirmCustom) {
    return (
        <Popconfirm title={title} onConfirm={onConfirm}>
            {children}
        </Popconfirm>
    );
}

export default PopconfirmCustom;
