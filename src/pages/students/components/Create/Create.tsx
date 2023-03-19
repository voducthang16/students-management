import { useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
import { Form, Input, Modal, Switch, Select } from 'antd';
import type { SelectProps } from 'antd';
import { studentsService } from 'src/services/features';
import { notify, slugify } from 'src/utils';
import { IModal } from 'src/models';
import { IStudent } from 'src/models/students.model';

const Create = forwardRef(function Create(props, ref: ForwardedRef<IModal>) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
        hideModal: () => {
            setOpen(false);
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
        {
            value: 'Watch TV 2',
            label: 'Watch TV 2',
        },
        {
            value: 'Watch TV 3',
            label: 'Watch TV 3',
        },
        {
            value: 'Watch TV 4',
            label: 'Watch TV 4',
        },
        {
            value: 'Watch TV 5',
            label: 'Watch TV 5',
        },
    ];

    const checkAge = (rule, value: string) => {
        if (+value > 0 && +value < 120) {
            return true;
        } else {
            return false;
        }
    };
    //

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

    const checkLength = (rule, value: string) => {
        if (value && value.trim().length === 0) {
            return Promise.reject('Field do not empty!!!!!');
        } else {
            return Promise.resolve();
        }
    };

    const validateInput = (rule, value, callback, message) => {
        if (value && value.trim() !== 0) {
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

    const onFormSubmit = (values: IStudent) => {
        studentsService
            .create({
                payload: values,
            })
            .then(() => {
                notify.success({
                    message: 'Success',
                    description: 'Created Student Success',
                    duration: 3,
                });
                setOpen(false);
            });
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldsValue({
            slug: slugify(event.currentTarget.value),
        });
    };
    return (
        <Modal
            open={open}
            title="Create a new student"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => setOpen(false)}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onFormSubmit(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
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
                <Form.Item
                    name="slug"
                    label="Slug"
                    required
                    // rules={[{ required: true, message: 'Please enter your name' }]}
                    hasFeedback
                >
                    <Input />
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
                        <Input
                            type="text"
                            className="w-full"
                            // onKeyPress={(e) => {
                            //     console.log(e.key);
                            //     console.log(!/[0-9]/.test(e.key));
                            //     console.log(/\./.test(e.key));

                            //     // (!/[0-9]/.test(e.key) || !/[\.]/.test(e.key)) && e.preventDefault();
                            //     (/\./.test(e.key) || !/[0-9]/.test(e.key)) && e.preventDefault();
                            // }}
                            // onPaste={(e) => {
                            //     const replaceValue = e.clipboardData.getData('Text').replace(/(\.\d+).*/, '');
                            //     console.log('🚀 ~ file: index.tsx:143 ~ replaceValue:', replaceValue);
                            // }}
                        />
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
                <Form.Item name="sex" label="Sex" valuePropName="checked" initialValue>
                    <Switch className="bg" checkedChildren="Male" unCheckedChildren="Female" defaultChecked />
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

export default Create;
