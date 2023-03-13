import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getListStudentsAsync, listStudents } from '~store/slice/students-slice';
import Item from '../Item';
function List() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(listStudents);
    useEffect(() => {
        dispatch(getListStudentsAsync());
    }, []);
    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Avatar
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Age
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Sex
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Points
                    </th>
                    <th scope="col" className="px-4 py-3">
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
                        />
                    ))}
            </tbody>
        </table>
    );
}

export default List;
