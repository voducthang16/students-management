import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Image, Popconfirm, Skeleton, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PopconfirmCustom } from 'components/custom';
import { TableMemoComponent } from 'components/custom/TableCustom';
import { PaginationConfig } from 'const';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks';
import { IModal, IPagination } from 'models';
import { IStudent } from 'models/students.model';
import {
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskFormScene from 'scenes/tasks/TaskFormScene';
import TaskStudentListScene from 'scenes/tasks/TaskStudentListScene';
import { studentsService } from 'services/features';
import { turnOff, turnOn } from 'store/slice/loading.slice';
import { notify, queryString } from 'utils';
import { StudentForm } from '.';

export interface IStudentListRef {
    onSearch: (params: IPagination) => void;
}

interface IStudentProps {
    clearInputSearch?: () => void;
}

const StudentList = forwardRef((props: IStudentProps, ref: ForwardedRef<IStudentListRef>) => {
    const [loading, setLoading] = useState(true);
    const { clearInputSearch } = props;
    const dispatch = useAppDispatch();
    const [list, setList] = useState<IStudent[]>();
    const [total, setTotal] = useState<number>(0);

    const taskFormRef = useRef<IModal>(null);
    const studentForm = useRef<IModal>(null);
    const taskStudentListRef = useRef<IModal>(null);
    const param = new PaginationConfig(1, 5);

    // PARAMS URL
    const [filter, setFilter] = useState<IPagination>({ ...param });

    const navigate = useNavigate();
    const location = useLocation();
    const params = location.search;
    const currentPage = new URLSearchParams(params).get('page') || 1;
    const pageSize = new URLSearchParams(params).get('limit') || 5;

    useImperativeHandle(ref, () => ({
        onSearch: (params: IPagination) => {
            dispatch(turnOn());
            handleSearch(params);
        },
    }));

    const handleSearch = (params: IPagination) => {
        getStudents(params);
        clearInputSearch?.();
    };

    useEffect(() => {
        let queryString: string | IPagination = filter;
        if (params.length !== 0) queryString = params;
        getStudents(queryString);
    }, []);

    const getStudents = (filterCurrent: string | IPagination = filter) => {
        studentsService.getAll({ filter: filterCurrent }).then((res) => {
            setList(res.data);
            if (typeof filterCurrent !== 'string' && 'search' in (filterCurrent as IPagination)) {
                setTotal(res.data.length);
                navigate('/');
            } else {
                getTotalStudent();
            }
            dispatch(turnOff());
            setLoading(false);
        });
    };

    const getTotalStudent = () => {
        studentsService
            .getAll({})
            .then((res) => {
                setTotal(res.data.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const renderTags = (name: string) => {
        switch (name) {
            case 'Music':
                return '#2db7f5';
            case 'Badminton':
                return '#87d068';
            case 'Football':
                return '#108ee9';
            case 'math':
                return 'gold';
            case 'physic':
                return 'green';
            case 'chemical':
                return 'purple';
            default:
                return '#f50';
        }
    };

    const handleOnSwitch = (record: IStudent) => {
        dispatch(turnOn());
        const newRecord = { ...record };
        newRecord.sex = !newRecord.sex;
        studentsService
            .put({
                payload: newRecord,
            })
            .then(() => {
                notify.success({
                    message: 'Success',
                    description: 'Update Sex Successfully',
                    duration: 3,
                });
                getStudents(filter);
            })
            .catch((err) => console.log(err));
    };

    const showStudentModal = (record: IStudent) => {
        if (studentForm.current) {
            studentForm.current.showModal();
            studentForm.current.getStudentInfo!(record);
        }
    };

    const showTaskModal = (record: IStudent) => {
        if (taskFormRef.current) {
            taskFormRef.current.showModal();
            taskFormRef.current.getStudentInfo!(record);
        }
    };

    const showTaskStudentListModal = (record: IStudent) => {
        if (taskStudentListRef.current) {
            taskStudentListRef.current.showModal();
            taskStudentListRef.current.getStudentInfo!(record);
        }
    };

    const handleDeleteStudent = (id: string) => {
        studentsService
            .delete(id)
            .then(() => {
                notify.success({
                    message: 'Success',
                    description: 'Delete Task Successfully',
                    duration: 3,
                });
                getStudents();
            })
            .catch((err) => {
                notify.success({
                    message: 'Error',
                    description: err,
                    duration: 3,
                });
            });
    };

    const columns: ColumnsType<IStudent> = useMemo(() => {
        return [
            {
                title: <h6 className="text-center text-base font-mono font-light">Name</h6>,
                dataIndex: 'name',
                key: 'name',
                render: (text) => <>{text}</>,
                fixed: 'left',
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Avatar</h6>,
                dataIndex: 'avatar',
                key: 'avatar',
                render: (text) => (
                    <Image
                        src={text}
                        alt={text}
                        className={'rounded-full w-full !h-full'}
                        rootClassName={'rounded-full h-14 w-14 p-0.5 border border-solid border-slate-200'}
                        fallback="https://imageio.forbes.com/specials-images/imageserve/63a590cfe96a4fea66cc7319/Venusian-Lake/0x0.jpg?format=jpg&crop=1625,914,x0,y484,safe&width=960"
                    />
                ),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Email</h6>,
                dataIndex: 'email',
                key: 'email',
                render: (text) => <>{text.toLocaleLowerCase()}</>,
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Age</h6>,
                dataIndex: 'age',
                key: 'age',
                width: 60,
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Hobbies</h6>,
                dataIndex: 'hobbies',
                key: 'hobbies',
                width: 90,
                render: (_, { hobbies }) => (
                    <div className="space-y-2">
                        {hobbies.map((hobby) => (
                            <Tag color={renderTags(hobby)} key={hobby}>
                                {hobby.toUpperCase()}
                            </Tag>
                        ))}
                    </div>
                ),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Sex</h6>,
                key: 'sex',
                dataIndex: 'sex',
                render: (_, record) => (
                    <Popconfirm
                        title="Sure to change?"
                        onConfirm={() => {
                            handleOnSwitch(record);
                        }}
                    >
                        <Switch
                            checked={record.sex}
                            checkedChildren={record.sex ? 'Male' : 'Female'}
                            unCheckedChildren={!record.sex ? 'Female' : 'Male'}
                        />
                    </Popconfirm>
                ),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Points</h6>,
                key: 'points',
                dataIndex: 'points',
                width: 60,
                render: (_, item) => (
                    <div className="space-y-2">
                        <Tag color={renderTags('math')}>Math: {item.math}</Tag>
                        <Tag color={renderTags('physic')}>Physic: {item.physic}</Tag>
                        <Tag color={renderTags('chemical')}>Chemical: {item.chemical}</Tag>
                    </div>
                ),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Tasks</h6>,
                key: 'tasks',
                dataIndex: 'tasks',
                width: 60,
                render: (_, record) => (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                showTaskStudentListModal(record);
                                dispatch(turnOn());
                            }}
                        >
                            View All
                        </Button>
                        <TaskStudentListScene ref={taskStudentListRef} />
                    </div>
                ),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Date Created</h6>,
                key: 'date created',
                dataIndex: 'date created',
                width: 140,
                render: (_, { createdAt }) => dayjs(createdAt).format('DD-MM-YYYY'),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Date Updated</h6>,
                key: 'date updated',
                dataIndex: 'date updated',
                width: 145,
                render: (_, { updatedAt }) => dayjs(updatedAt).format('DD-MM-YYYY'),
            },
            {
                title: <h6 className="text-center text-base font-mono font-light">Actions</h6>,
                dataIndex: 'actions',
                key: 'actions',
                width: 100,
                render: (_, record) => (
                    <div className="flex space-x-1">
                        <div title="Edit User">
                            <Button
                                className="px-0"
                                type="ghost"
                                onClick={() => {
                                    showStudentModal(record);
                                    dispatch(turnOn());
                                }}
                            >
                                <EditFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                            </Button>
                            <StudentForm onChange={getStudents} ref={studentForm} />
                        </div>
                        <div title="Add Task">
                            <Button
                                className="px-0"
                                type="ghost"
                                onClick={() => {
                                    showTaskModal(record);
                                }}
                            >
                                <PlusCircleFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                            </Button>
                            <TaskFormScene ref={taskFormRef} />
                        </div>
                        <div title="Delete Student">
                            <PopconfirmCustom
                                title="Sure to delete?"
                                onConfirm={() => {
                                    dispatch(turnOn());
                                    handleDeleteStudent(record.id);
                                }}
                            >
                                <Button className="px-0" type="ghost">
                                    <DeleteFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                                </Button>
                            </PopconfirmCustom>
                        </div>
                    </div>
                ),
                fixed: 'right',
            },
        ];
    }, []);

    const handlePageSizeChange = useCallback((filter: IPagination) => {
        dispatch(turnOn());
        getStudents(filter);
        setFilter(filter);
        const query = queryString({ filter });
        navigate(`/${query}`);
    }, []);
    return (
        <>
            {loading ? (
                <Skeleton avatar paragraph={{ rows: 10 }} />
            ) : (
                <TableMemoComponent<IStudent>
                    columns={columns}
                    dataSource={list!}
                    pagination={{
                        current: +currentPage,
                        pageSize: +pageSize,
                    }}
                    onTableChange={handlePageSizeChange}
                    filter={filter}
                    totalItem={total}
                />
            )}
        </>
    );
});

export default StudentList;
