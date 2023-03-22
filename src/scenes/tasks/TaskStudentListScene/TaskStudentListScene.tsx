import { Modal, Popconfirm, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, useMemo } from 'react';
import { PaginationConfig } from 'src/const';
import { IModal, IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import { ITask } from 'src/models/tasks.model';
import { taskServices } from 'src/services/features/tasks.services';
import { TableMemoComponent } from '~components/custom/TableCustom/TableCustom';

const TaskStudentListScene = forwardRef((props, ref: ForwardedRef<IModal>) => {
    const [open, setOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState<IStudent>();
    const [taskList, setTaskList] = useState<ITask[]>();
    const [total, setTotal] = useState<number>(0);

    const param = new PaginationConfig(1, 3);
    const [filter, setFilter] = useState<IPagination>({ ...param });

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
        getStudentInfo(record) {
            setStudentInfo(record);
            if (record) {
                getTaskListStudent(record.id);
            }
        },
        // getTaskInfo(record) {
        // },
    }));

    const getTaskListStudent = (id: string) => {
        taskServices
            .getStudentsTask(id)
            .then((res) => {
                setTaskList(res.data);
                setTotal(res.data.length);
            })
            .catch((err) => console.log(err));
    };

    const handleOnSwitch = (record: ITask) => {
        const newRecord = { ...record };
        newRecord.status = !newRecord.status;
    };

    const handlePageSizeChange = () => {};

    const columns: ColumnsType<ITask> = useMemo(() => {
        return [
            {
                title: 'Task',
                dataIndex: 'task',
                key: 'task',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (_, record) => (
                    <Popconfirm
                        title="Sure to change?"
                        onConfirm={() => {
                            handleOnSwitch(record);
                        }}
                    >
                        <Switch
                            checked={record.status}
                            checkedChildren={record.status ? 'Active' : 'Inactive'}
                            unCheckedChildren={!record.status ? 'Inactive' : 'Active'}
                        />
                    </Popconfirm>
                ),
            },
            {
                title: 'Date Created',
                key: 'date created',
                dataIndex: 'date created',
                render: (_, { createdAt }) => dayjs(createdAt).format('DD-MM-YYYY'),
            },
            {
                title: 'Date Updated',
                key: 'date updated',
                dataIndex: 'date updated',
                render: (_, { updatedAt }) => dayjs(updatedAt).format('DD-MM-YYYY'),
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => <div className="flex"></div>,
                // fixed: 'right',
            },
        ];
    }, []);
    return (
        <Modal
            open={open}
            title={`Task List Student - ${studentInfo && studentInfo!.name}`}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => setOpen(false)}
            centered
            width={800}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '16px' }}
        >
            <TableMemoComponent<ITask>
                IColumns={columns}
                IData={taskList!}
                // pagination={{
                //     total: total,
                //     pageSize: +pageSize,
                //     current: +currentPage,
                //     pageSizeOptions: pageSizeOptions,
                // }}
                onChange={handlePageSizeChange}
                // onShowSizeChange={handlePageSizeOptionsChange}
                totalItem={total}
                filter={filter}
            />
        </Modal>
    );
});

export default TaskStudentListScene;
