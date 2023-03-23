import { Form, Modal } from 'antd';
import { IModal } from 'models';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

interface IModalCustom {
    title: string;
    children: any;
}

const ModalCustom = forwardRef((props: IModalCustom, ref: ForwardedRef<IModal>) => {
    const { title, children } = props;
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
    }));
    return (
        <Modal
            open={open}
            title={title}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => setOpen(false)}
            centered
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '16px' }}
        >
            {children}
        </Modal>
    );
});

export default ModalCustom;
