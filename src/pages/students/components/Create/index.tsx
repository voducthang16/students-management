import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio, InputNumber, Switch, Select } from 'antd';
import type { SelectProps } from 'antd';
import { IStudent } from 'src/models/students.model';

interface CreateProps {
    open: boolean;
    onCreate: (values: IStudent) => void;
    onCancel: () => void;
}

const Create: React.FC<CreateProps> = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const checkAge = (rule, value: string) => {
        if (+value > 0 && +value < 120) {
            return Promise.resolve();
        } else {
            return Promise.reject('Please enter age > 0 & age < 120');
        }
    };

    const checkPointSubject = (rule, value: string, subject: string) => {
        const regex = /^\d*\.?(?:\d{1,2})?$/;

        if (value && regex.test(value.trim()) && +value >= 0 && +value <= 10) {
            return Promise.resolve();
        } else {
            return Promise.reject(
                `Please enter your ${subject} point following rules: >= 0 & <= 10, 1 dot & 2 decimal`,
            );
        }
    };

    const validLink = (rule, value: string) => {
        const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (regex.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject('Please enter a valid URL');
        }
    };

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

    const checkLength = (rule, value: string) => {
        if (value.trim().length === 0) {
            return Promise.reject('Field do not empty!!!!!');
        } else {
            return Promise.resolve();
        }
    };

    return (
        <Modal
            okType="link"
            open={open}
            title="Create a new student"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'Please enter your name' },
                        {
                            validator: (rule, value) => checkLength(rule, value),
                        },
                    ]}
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
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar URL"
                    rules={[
                        { required: true, message: 'Please enter your avatar url' },
                        {
                            validator: (rule, value) => validLink(rule, value),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: 'Please enter your age' },
                        {
                            validator: (rule, value) => checkAge(rule, value),
                        },
                    ]}
                >
                    <Input
                        type="text"
                        className={'w-full'}
                        // onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                        // onPaste={(e) => {
                        //     const replaceValue = e.clipboardData.getData('Text').replace(/[^0-9]/g, '');
                        //     form.setFieldsValue({ age: replaceValue });
                        //     form.validateFields(['age']);
                        //     e.preventDefault();
                        // }}
                        onChange={(e) => {
                            const replaceValue = e.currentTarget.value.replace(/[^\d]+/g, '');
                            // const replaceValue = e.currentTarget.value.replace(/[^0-9]+/g, '');
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
                        rules={[
                            { required: true, message: 'Please enter your math point' },
                            {
                                validator: (rule, value) => checkPointSubject(rule, value, 'math'),
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
                        rules={[
                            { required: true, message: 'Please enter your physic point' },
                            {
                                validator: (rule, value) => checkPointSubject(rule, value, 'physic'),
                            },
                        ]}
                    >
                        <Input type="text" className="w-full" min={0} max={10} />
                        {/* ^\d*\.?(?:\d{1,2})?$ */}
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        name="chemical"
                        label="Chemical"
                        rules={[
                            { required: true, message: 'Please enter your chemical point' },
                            {
                                validator: (rule, value) => checkPointSubject(rule, value, 'chemical'),
                            },
                        ]}
                    >
                        <Input type="text" className="w-full" min={0} max={10} />
                    </Form.Item>
                </div>
                <Form.Item name="sex" label="Sex" valuePropName="checked">
                    {/* <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Radio.Group> */}
                    <Switch className="bg" checkedChildren="Male" unCheckedChildren="Female" defaultChecked />
                </Form.Item>
                <Form.Item name="hobbies" label="Hobbies">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Please select gender"
                        // onChange={handleChange}
                        options={options}
                        // placement="topLeft"
                        // listHeight={100}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Create;
