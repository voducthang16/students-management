import type { SelectProps } from 'antd';
import { Form, Input, Modal, Select, Switch } from 'antd';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { useAppDispatch } from 'src/hooks';
import { IModal } from 'src/models';
import { IStudent } from 'src/models/students.model';
import { studentsService } from 'src/services/features';
import { notify, slugify } from 'src/utils';
import { turnOff, turnOn } from '~store/slice/loading.slice';

interface IProps {
    onChange?: () => void;
}

const FormStudent = forwardRef((props: IProps, ref: ForwardedRef<IModal>) => {
    const { onChange } = props;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [studentId, setStudentId] = useState<string | undefined>();

    const dispatch = useAppDispatch();

    const getDetailStudent = (id: string | number) => {
        studentsService
            .getOne(id)
            .then((res) => {
                setFormValues(res.data);
                dispatch(turnOff());
            })
            .catch(() => {
                notify.error({
                    message: 'Error',
                    description: 'Get Detail Student Error',
                    duration: 3,
                });
            });
    };

    const setFormValues = (data: IStudent) => {
        form.setFieldsValue(data);
    };

    const resetFormValues = () => {
        form.resetFields();
    };

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
        getStudentInfo(record) {
            if (record) {
                setStudentId(record.id);
                getDetailStudent(record.id);
            }
        },
    }));

    const options: SelectProps['options'] = [
        {
            value: 'Music',
            label: 'Music',
        },
        {
            value: 'Badminton',
            label: 'Badminton',
        },
        {
            value: 'Football',
            label: 'Football',
        },
        {
            value: 'Game',
            label: 'Game',
        },
        {
            value: 'Watch TV',
            label: 'Watch TV',
        },
    ];

    const checkAge = (rule, value: string) => {
        if (+value > 0 && +value < 120) {
            return true;
        } else {
            return false;
        }
    };

    const checkPointSubject = (rule, value: string) => {
        const regex = /^\d*\.?(?:\d{1,2})?$/;
        if (value.trim().length > 0 && regex.test(value.trim()) && +value >= 0 && +value <= 10) {
            return true;
        } else {
            return false;
        }
    };

    const validLink = (rule, value: string) => {
        const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (value && regex.test(value)) {
            return true;
        } else {
            return false;
        }
    };

    const validateInput = (rule, value, callback, message) => {
        if (value && value.toString().trim().length !== 0) {
            const valid = callback(rule, value);
            if (valid) {
                return Promise.resolve();
            } else {
                return Promise.reject(message);
            }
        } else {
            return Promise.reject('Field do not empty!!!!!');
        }
    };

    const createStudent = (values: IStudent) => {
        studentsService
            .create({
                payload: values,
            })
            .then(() => {
                notify.success({
                    message: 'Success',
                    description: 'Create Student Success',
                    duration: 3,
                });
                setOpen(false);
            });
    };

    const updatedStudent = (values: IStudent) => {
        dispatch(turnOn());
        studentsService
            .put({
                payload: {
                    ...values,
                    id: studentId!,
                },
            })
            .then(() => {
                onChange?.();
                notify.success({
                    message: 'Success',
                    description: 'Update Student Successfully',
                    duration: 3,
                });
                setOpen(false);
            })
            .catch((err) => console.log(err));
    };

    const onFormSubmit = (values: IStudent) => {
        +studentId! > 0 ? updatedStudent(values) : createStudent(values);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldsValue({
            slug: slugify(event.currentTarget.value),
        });
    };

    const handleFocus = () => {
        setIsReadOnly(false);
    };

    const handleBlur = () => {
        setIsReadOnly(true);
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

    return (
        <Modal
            open={open}
            title={`${(studentId && studentId.length)! > 0 ? 'Update' : 'Create'} student`}
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
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                    hasFeedback
                >
                    <Input onChange={handleNameChange} />
                </Form.Item>
                <Form.Item name="slug" label="Slug" required hasFeedback>
                    <Input
                        className={`${isReadOnly && 'bg-gray-400'}`}
                        readOnly={isReadOnly}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        {
                            message: 'Please enter a valid email',
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar URL"
                    required
                    rules={[
                        {
                            validator: (rule, value) =>
                                validateInput(rule, value, validLink, 'Please enter a valid email'),
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    required
                    rules={[
                        {
                            validator: (rule, value) =>
                                validateInput(rule, value, checkAge, 'Please enter age > 0 & age < 120'),
                        },
                    ]}
                >
                    <Input
                        type="text"
                        className={'w-full'}
                        onChange={(e) => {
                            const replaceValue = e.currentTarget.value.replace(/[^\d]+/g, '');
                            form.setFieldsValue({ age: replaceValue });
                            form.validateFields(['age']);
                        }}
                    />
                </Form.Item>
                <div className="flex space-x-4">
                    <Form.Item
                        className="flex-1"
                        name="math"
                        label="Math"
                        required
                        rules={[
                            {
                                validator: (rule, value) =>
                                    validateInput(
                                        rule,
                                        value,
                                        checkPointSubject,
                                        'Please enter your math point following rules: >= 0 & <= 10, 1 dot & 2 decimal',
                                    ),
                            },
                        ]}
                    >
                        <Input type="text" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        name="physic"
                        label="Physic"
                        required
                        rules={[
                            {
                                validator: (rule, value) =>
                                    validateInput(
                                        rule,
                                        value,
                                        checkPointSubject,
                                        'Please enter your math point following rules: >= 0 & <= 10, 1 dot & 2 decimal',
                                    ),
                            },
                        ]}
                    >
                        <Input type="text" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        name="chemical"
                        label="Chemical"
                        required
                        rules={[
                            {
                                validator: (rule, value) =>
                                    validateInput(
                                        rule,
                                        value,
                                        checkPointSubject,
                                        'Please enter your math point following rules: >= 0 & <= 10, 1 dot & 2 decimal',
                                    ),
                            },
                        ]}
                    >
                        <Input type="text" className="w-full" />
                    </Form.Item>
                </div>
                <Form.Item name="sex" label="Sex" valuePropName="checked" initialValue={true}>
                    <Switch checkedChildren="Male" unCheckedChildren="Female" defaultChecked />
                </Form.Item>
                <Form.Item name="hobbies" label="Hobbies">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Please select hobbies"
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default FormStudent;
