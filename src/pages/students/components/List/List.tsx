import { Image, Popconfirm, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState, useMemo } from 'react';
import { paginationConfig } from 'src/constants';
import { IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import TableCustom from '~components/custom/TableCustom';
import { studentsService } from 'src/services/features';
import { notify, queryString } from 'src/utils';
import { useLocation, useNavigate } from 'react-router-dom';
function List() {
    const [list, setList] = useState<IStudent[]>();
    const [total, setTotal] = useState<number>(0);
    const [filter, setFilter] = useState<IPagination>(paginationConfig);
    const location = useLocation();
    const navigate = useNavigate();
    const params = location.search;
    const currentPage = new URLSearchParams(params).get('page') || 1;

    useEffect(() => {
        let queryString: string | IPagination = filter;
        if (params.length !== 0) queryString = params;
        getStudents(queryString);

        getTotalStudent();
    }, []);

    const getStudents = (filter: string | IPagination) => {
        studentsService.getAll({ filter }).then((res) => {
            setList(res.data);
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

    const columns: ColumnsType<IStudent> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <>{text}</>,
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
        },
    ];

    const [status, setStatus] = useState(false);

    const handleChangePage = (filter: IPagination) => {
        getStudents(filter);
        const query = queryString({ filter });
        navigate(`/${query}`);
        setFilter(filter);
    };

    const memoized = useMemo(() => {
        return (
            <TableCustom<IStudent>
                IColumns={columns}
                IData={list!}
                pagination={{
                    total: total,
                    pageSize: +filter.limit,
                    current: +currentPage,
                }}
                onChange={handleChangePage}
                filter={filter}
            />
        );
    }, [list]);

    return (
        <>
            {memoized}
            <button onClick={() => setStatus(!status)}>BUTTON</button>
        </>
    );
}

export default List;
