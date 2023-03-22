import { EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Image, Popconfirm, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaginationConfig } from 'src/const';
import { IModal, IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import TaskFormScene from 'src/scenes/tasks/TaskFormScene';
import TaskStudentListScene from 'src/scenes/tasks/TaskStudentListScene';
import { studentsService } from 'src/services/features';
import { notify, queryString } from 'src/utils';
import { TableMemoComponent } from '~components/custom/TableCustom/TableCustom';
import Loading from '~components/Loading';
import { StudentForm } from '.';
function StudentList() {
    const [loading, setLoading] = useState<boolean>(false);

    const [list, setList] = useState<IStudent[]>();
    const [total, setTotal] = useState<number>(0);

    const taskFormRef = useRef<IModal>(null);
    const studentForm = useRef<IModal>(null);
    const taskStudentListRef = useRef<IModal>(null);
    const param = new PaginationConfig(1, 3);

    // PARAMS URL
    const [filter, setFilter] = useState<IPagination>({ ...param });

    // const [pageSize, setPageSize] = useState<number>(paginationConfig.limit);
    // const [pageSizeOptions, setPageSizeOptions] = useState(TablePagination.pageSizeOptions);

    const navigate = useNavigate();
    const location = useLocation();
    const params = location.search;

    useEffect(() => {
        let queryString: string | IPagination = filter;
        if (params.length !== 0) queryString = params;
        getStudents(queryString);
        getTotalStudent();
    }, []);

    const getStudents = (filterCurrent: string | IPagination = filter) => {
        setLoading(false);
        studentsService.getAll({ filter: filterCurrent }).then((res) => {
            setList(res.data);
            setLoading(true);
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

    const showTaskStudentModal = (record: IStudent) => {
        if (taskStudentListRef.current) {
            taskStudentListRef.current.showModal();
            taskStudentListRef.current.getStudentInfo!(record);
        }
    };

    const columns: ColumnsType<IStudent> = useMemo(() => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <>{text}</>,
                fixed: 'left',
            },
            {
                title: 'Avatar',
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
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: (text) => <>{text.toLocaleLowerCase()}</>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Hobbies',
                dataIndex: 'hobbies',
                key: 'hobbies',
                width: '90px',
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
                title: 'Sex',
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
                title: 'Points',
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
                title: 'Tasks',
                key: 'tasks',
                dataIndex: 'tasks',
                width: 60,
                render: (_, record) => (
                    <div>
                        <Button type="primary" onClick={() => showTaskStudentModal(record)}>
                            View All
                        </Button>
                        <TaskStudentListScene ref={taskStudentListRef} />
                    </div>
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
                        <div title="Edit User">
                            <Button
                                type="ghost"
                                onClick={() => {
                                    showStudentModal(record);
                                }}
                            >
                                <EditFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                            </Button>
                            <StudentForm onChange={getStudents} ref={studentForm} />
                        </div>
                        <div title="Add Task">
                            <Button
                                type="ghost"
                                onClick={() => {
                                    showTaskModal(record);
                                }}
                            >
                                <PlusCircleFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                            </Button>
                            <TaskFormScene ref={taskFormRef} />
                        </div>
                    </div>
                ),
                fixed: 'right',
            },
        ];
    }, []);

    // const handleNewPageSizeOptions = (dataLength?: number) => {
    //     const pageCount = Math.ceil(dataLength! / pageSize);
    //     const newPageSizeOptions: string[] = [];
    //     for (let i = 1; i <= pageCount; i++) {
    //         newPageSizeOptions.push(`${i * pageSize}`);
    //     }
    //     setPageSizeOptions(newPageSizeOptions);
    // };

    const [status, setStatus] = useState(false);

    const handlePageSizeChange = useCallback((filter: IPagination) => {
        getStudents(filter);
        const query = queryString({ filter });
        navigate(`/${query}`);
        setFilter(filter);
        // setPageSize(+filter.limit);
    }, []);

    // const handlePageSizeOptionsChange = (current: number, size: number) => {
    //     setPageSizeOptions([`${size}`, '20', '50', '100']);
    //     setPageSize(size);
    // };

    return (
        <>
            {loading ? (
                <>
                    <TableMemoComponent<IStudent>
                        IColumns={columns}
                        IData={list!}
                        // pagination={{
                        //     total: total,
                        //     pageSize: +pageSize,
                        //     current: +currentPage,
                        //     pageSizeOptions: pageSizeOptions,
                        // }}
                        onChange={handlePageSizeChange}
                        // onShowSizeChange={handlePageSizeOptionsChange}
                        filter={filter}
                        totalItem={total}
                    />
                    <button onClick={() => setTotal(10)}>change</button>
                </>
            ) : (
                <Loading />
            )}
            <button onClick={() => setStatus(!status)}>BUTTON</button>
        </>
    );
}

export default StudentList;