import { useState, forwardRef, ForwardedRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Modal, Switch, Select } from 'antd';
import { IModal } from 'src/models';
import { ITask } from 'src/models/tasks.model';
import { taskServices } from 'src/services/features/tasks.services';
import { notify } from 'src/utils';
interface IProps {
    onChange?: () => void;
}

const TaskFormScene = forwardRef((props: IProps, ref: ForwardedRef<IModal>) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [studentId, setStudentId] = useState<string | null>();
    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
        getStudentInfo(record) {
            if (record) {
                setStudentId(record.id);
                form.setFieldValue('studentName', record.name);
            }
        },
    }));

    const createTask = (values: ITask) => {
        taskServices
            .create({
                payload: values,
                url: `students/${studentId}/tasks`,
            })
            .then(() => {
                notify.success({
                    message: 'Success',
                    description: 'Create Task Success',
                    duration: 3,
                });
                setOpen(false);
            });
    };

    const handleOnOk = () => {
        form.validateFields()
            .then((values) => {
                onFormSubmit(values);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const onFormSubmit = (values: ITask) => {
        createTask(values);
    };

    return (
        <Modal
            open={open}
            title={`Create Task`}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => setOpen(false)}
            onOk={handleOnOk}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '16px' }}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item name="studentName" label="Student Name">
                    <Input readOnly />
                </Form.Item>
                <Form.Item name="task" label="Task Name" required>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Task Description" required>
                    <Input />
                </Form.Item>
                <Form.Item name="status" label="Status" valuePropName="checked" initialValue={true}>
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default TaskFormScene;
