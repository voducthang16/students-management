import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { notify } from 'src/utils/Notification';
import { getListStudentsAsync, listStudents } from '~store/slice/students-slice';
import Item from '../Item';
function List() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(listStudents);
    useEffect(() => {
        dispatch(
            getListStudentsAsync({
                page: 1,
                limit: 10,
            }),
        );
        // test notification
        // notify.warning({
        //     message: 'test',
        //     description: 'desc',
        //     duration: 2,
        // });
    }, []);
    return (
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="font-[Poppins] text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Name
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Avatar
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Email
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Age
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Sex
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Points
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Date Created
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        Date Updated
                    </th>
                    <th scope="col" className="px-4 py-3 border-solid border border-slate-300">
                        <span>Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {list &&
                    list.map((item) => (
                        <Item
                            key={item.id}
                            name={item.name}
                            age={item.age}
                            avatar={item.avatar}
                            email={item.email}
                            sex={item.sex}
                            math={item.math}
                            physic={item.physic}
                            chemical={item.chemical}
                            createdAt={item.createdAt}
                            updatedAt={item.updatedAt}
                        />
                    ))}
            </tbody>
        </table>
    );
}

export default List;
