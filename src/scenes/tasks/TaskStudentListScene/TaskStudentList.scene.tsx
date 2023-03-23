import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { PaginationConfig } from 'src/const';
import { useAppDispatch } from 'src/hooks';
import { IModal, IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import { ITask } from 'src/models/tasks.model';
import { taskServices } from 'src/services/features/tasks.services';
import { notify } from 'src/utils';
import { PopconfirmCustom } from '~components/custom';
import { TableMemoComponent } from '~components/custom/TableCustom';
import { turnOff, turnOn } from '~store/slice/loading.slice';
import TaskFormScene from '../TaskFormScene';

const TaskStudentListScene = forwardRef((props, ref: ForwardedRef<IModal>) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState<IStudent>();
    const [taskList, setTaskList] = useState<ITask[]>();
    const [total, setTotal] = useState<number>(0);

    const param = new PaginationConfig(1, 3);
    const [filter, setFilter] = useState<IPagination>({ ...param });
    const [pageSize, setPageSize] = useState(3);
    const taskFormRef = useRef<IModal>(null);

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpen(true);
        },
        getStudentInfo(record) {
            setStudentInfo(record);
            if (record) {
                getTaskListStudent(record.id, filter);
                getAllTasksStudent(record.id);
            }
        },
    }));

    const getTaskListStudent = (id: string, filterCurrent: IPagination = filter) => {
        taskServices
            .getStudentsTask(id, { filter: filterCurrent })
            .then((res) => {
                setTaskList(res.data);

                dispatch(turnOff());
            })
            .catch((err) => {
                notify.success({
                    message: 'Error',
                    description: err,
                    duration: 3,
                });
            });
    };

    const getAllTasksStudent = (id: string) => {
        taskServices
            .getStudentsTask(id, {})
            .then((res) => {
                setTotal(res.data.length);
            })
            .catch((err) => console.log(err));
    };

    const handleOnSwitch = (record: ITask) => {
        const newRecord = { ...record };
        newRecord.status = !newRecord.status;
        taskServices
            .updateStudentTask({
                payload: newRecord,
            })
            .then((res) => {
                notify.success({
                    message: 'Success',
                    description: 'Update Task Status Successfully',
                    duration: 3,
                });
                getTaskListStudent(res.data.studentId);
            })
            .catch((err) => {
                notify.success({
                    message: 'Error',
                    description: err,
                    duration: 3,
                });
            });
    };

    const handlePageSizeChange = (filter: IPagination) => {
        dispatch(turnOn());
        setFilter(filter);
        getTaskListStudent(studentInfo!.id, filter);
        setPageSize(+filter.limit);
    };

    const handleDeleteStudentTask = (studentId: string, taskId: string) => {
        taskServices
            .deleteStudentTask(studentId, taskId)
            .then((res) => {
                notify.success({
                    message: 'Success',
                    description: 'Delete Task Successfully',
                    duration: 3,
                });
                getTaskListStudent(res.data.studentId);
            })
            .catch((err) => console.log(err));
    };

    const showTaskModal = (record: ITask) => {
        if (taskFormRef.current) {
            taskFormRef.current.showModal();
            taskFormRef.current.getTaskInfo!(record);
        }
    };

    const columns: ColumnsType<ITask> = useMemo(() => {
        return [
            {
                title: 'Task',
                dataIndex: 'task',
                key: 'task',
                render: (_, record) => <span className={`${record.status ? '' : 'line-through'}`}>{record.task}</span>,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: (_, record) => (
                    <span className={`${record.status ? '' : 'line-through'}`}>{record.description}</span>
                ),
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
                render: (_, record) => (
                    <div className="flex">
                        <div title="Edit Task">
                            <Button
                                type="ghost"
                                onClick={() => {
                                    showTaskModal(record);
                                }}
                            >
                                <EditFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                            </Button>
                            <TaskFormScene onChange={getTaskListStudent} ref={taskFormRef} />
                        </div>
                        <div title="Delete Task">
                            <PopconfirmCustom
                                title="Sure to delete?"
                                onConfirm={() => handleDeleteStudentTask(record.studentId, record.id)}
                            >
                                <Button type="ghost">
                                    <DeleteFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                                </Button>
                            </PopconfirmCustom>
                        </div>
                    </div>
                ),
                // fixed: 'right',
            },
        ];
    }, []);
    return (
        <Modal
            open={open}
            title={`Task List Student - ${studentInfo && studentInfo!.name}`}
            // okText="Save"
            // cancelText="Cancel"
            onCancel={() => setOpen(false)}
            footer={null}
            centered
            width={800}
            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingRight: '16px' }}
        >
            <TableMemoComponent<ITask>
                IColumns={columns}
                IData={taskList!}
                pagination={{
                    pageSize: pageSize,
                }}
                onTableChange={handlePageSizeChange}
                totalItem={total}
                filter={filter}
            />
        </Modal>
    );
});

export default TaskStudentListScene;
