import { Form, Input, Modal, Switch } from 'antd';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { IModal } from 'src/models';
import { ITask } from 'src/models/tasks.model';
import { taskServices } from 'src/services/features/tasks.services';
import { notify } from 'src/utils';
interface IProps {
    onChange?: (studentId: string) => void;
}

const TaskFormScene = forwardRef((props: IProps, ref: ForwardedRef<IModal>) => {
    const { onChange } = props;
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [studentId, setStudentId] = useState<string | null>();
    const [taskId, setTaskId] = useState<string | undefined>();
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
        getTaskInfo(record) {
            if (record) {
                setTaskId(record.id);
                setStudentId(record.studentId);
                getDetailTask(record.studentId, record.id);
            }
        },
    }));

    const setFormValues = (data: ITask) => {
        form.setFieldsValue(data);
    };

    const resetFormValues = () => {
        form.resetFields();
    };

    const getDetailTask = (studentId: string, taskId: string) => {
        taskServices
            .getDetailTask(studentId, taskId)
            .then((res) => setFormValues(res.data))
            .catch((err) => console.log(err));
    };

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

    const updateTask = (values: ITask) => {
        const newValues = {
            ...values,
            studentId: studentId,
            id: taskId,
        };
        taskServices
            .updateStudentTask({
                payload: newValues,
            })
            .then((res) => {
                console.log(res);

                notify.success({
                    message: 'Success',
                    description: 'Update Task Successfully',
                    duration: 3,
                });
                setOpen(false);
                onChange?.(res.data.studentId);
            })
            .catch((err) => console.log(err));
    };

    const handleOnOk = () => {
        form.validateFields()
            .then((values) => {
                onFormSubmit(values);
                resetFormValues();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const onFormSubmit = (values: ITask) => {
        taskId ? updateTask(values) : createTask(values);
    };

    const validateInput = (rule, value) => {
        if (value && value.trim().length !== 0) {
            return Promise.resolve();
        } else {
            return Promise.reject('Field do not empty!!!!!');
        }
    };

    return (
        <Modal
            open={open}
            title={`${taskId ? 'Update' : 'Create'} Task`}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => {
                setOpen(false);
                resetFormValues();
            }}
            onOk={handleOnOk}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '16px' }}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item name="studentName" label="Student Name">
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="task"
                    label="Task Name"
                    required
                    rules={[
                        {
                            validator: validateInput,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Task Description"
                    required
                    rules={[
                        {
                            validator: validateInput,
                        },
                    ]}
                >
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
