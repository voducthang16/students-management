import { useEffect, useState, useMemo, useRef } from 'react';
import { Image, Popconfirm, Switch, Tag, Skeleton, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { paginationConfig } from 'src/constants';
import { IModal, IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import TableCustom from '~components/custom/TableCustom';
import { studentsService } from 'src/services/features';
import { notify, queryString } from 'src/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { TablePagination } from 'src/config/TablePagination';
import { EditFilled, PlusCircleFilled } from '@ant-design/icons';
import Create from '../Create';
function List() {
    const [loading, setLoading] = useState<boolean>(false);

    const [list, setList] = useState<IStudent[]>();
    const [total, setTotal] = useState<number>(0);

    // PARAMS URL
    const [filter, setFilter] = useState<IPagination>(paginationConfig);

    const [pageSize, setPageSize] = useState<number>(paginationConfig.limit);
    const [pageSizeOptions, setPageSizeOptions] = useState(TablePagination.pageSizeOptions);

    const navigate = useNavigate();
    const location = useLocation();
    const params = location.search;

    const currentPage = new URLSearchParams(params).get('page') || 1;

    useEffect(() => {
        let queryString: string | IPagination = filter;
        if (params.length !== 0) queryString = params;
        getStudents(queryString);
        getTotalStudent();
    }, []);

    const getStudents = (filterCurrent: string | IPagination = filter) => {
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
                handleNewPageSizeOptions(res.data.length);
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

    const create = useRef<IModal>(null);
    const showModal = (record: IStudent) => {
        create.current && create.current.showModal(record);
    };

    const columns: ColumnsType<IStudent> = [
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
                                showModal(record);
                            }}
                        >
                            <EditFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                        </Button>
                        <Create onChange={getStudents} ref={create} />
                    </div>
                    {/* <div title="Add Task">
                        <Button
                            type="ghost"
                            onClick={() => {
                                showModal(record);
                            }}
                        >
                            <PlusCircleFilled className="text-lg cursor-pointer hover:opacity-80 transition-all" />
                        </Button>
                        <Create ref={create} />
                    </div> */}
                </div>
            ),
            fixed: 'right',
        },
    ];

    const handleNewPageSizeOptions = (dataLength?: number) => {
        const pageCount = Math.ceil(dataLength! / pageSize);
        const newPageSizeOptions: string[] = [];
        for (let i = 1; i <= pageCount; i++) {
            newPageSizeOptions.push(`${i * pageSize}`);
        }
        setPageSizeOptions(newPageSizeOptions);
    };

    const [status, setStatus] = useState(false);

    const handlePageSizeChange = (filter: IPagination) => {
        getStudents(filter);
        const query = queryString({ filter });
        navigate(`/${query}`);
        setFilter(filter);
        setPageSize(+filter.limit);
    };

    const handlePageSizeOptionsChange = (current: number, size: number) => {
        setPageSizeOptions([`${size}`, '20', '50', '100']);
        setPageSize(size);
    };

    const memoized = useMemo(() => {
        return (
            <TableCustom<IStudent>
                IColumns={columns}
                IData={list!}
                pagination={{
                    total: total,
                    pageSize: +pageSize,
                    current: +currentPage,
                    pageSizeOptions: pageSizeOptions,
                }}
                onChange={handlePageSizeChange}
                onShowSizeChange={handlePageSizeOptionsChange}
                filter={filter}
            />
        );
    }, [list]);

    return (
        <>
            {loading ? memoized : <Skeleton />}
            <button onClick={() => setStatus(!status)}>BUTTON</button>
        </>
    );
}

export default List;
