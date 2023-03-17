import { Image, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState, useMemo } from 'react';
import { paginationConfig } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { IPagination } from 'src/models';
import { IStudent } from 'src/models/students.model';
import TableCustom from '~components/custom/TableCustom';
import { getListStudentsAsync, getTotalStudentsAsync, listStudents, totalStudents } from '~store/slice/students-slice';

function List() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(listStudents);
    const total = useAppSelector(totalStudents);
    const [filter, setFilter] = useState<IPagination>(paginationConfig);
    useEffect(() => {
        dispatch(getListStudentsAsync(filter));
        dispatch(getTotalStudentsAsync());
    }, []);
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
    //

    const [status, setStatus] = useState(false);

    const handleChangePage = (filter: IPagination) => {
        setFilter(filter);

        dispatch(getListStudentsAsync(filter));
    };

    const memoized = useMemo(() => {
        return (
            <TableCustom<IStudent>
                IColumns={columns}
                IData={list}
                pagination={{
                    total: total,
                    pageSize: +filter.limit,
                }}
                onChange={handleChangePage}
                filter={filter}
            />
        );
    }, [filter]);

    return (
        <>
            {memoized}
            <button onClick={() => setStatus(!status)}>BUTTON</button>
        </>
    );
}

export default List;
