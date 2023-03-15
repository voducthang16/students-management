import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification/interface';
import { Icons } from '~components/Icons/Icons';
const success = ({ message, description, duration = 3, placement = 'topRight' }: ArgsProps) => {
    notification.success({
        message,
        description,
        duration,
        placement,
        onClose: () => console.log('Notification closed'),
    });
};

const warning = ({ message, description, duration = 3, placement = 'topRight' }: ArgsProps) => {
    notification.warning({
        message,
        description,
        duration,
        placement,
        onClose: () => console.log('Notification closed'),
        className: 'bg-[#ecb90d]',
        // closeIcon: Icons(),
        icon: Icons(),
    });
};

const error = ({ message, description, duration = 3, placement = 'topRight' }: ArgsProps) => {
    notification.error({
        message,
        description,
        duration,
        placement,
        onClose: () => console.log('Notification closed'),
    });
};

export const notify = {
    success,
    warning,
    error,
};
