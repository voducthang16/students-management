import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IPagination } from 'src/models';

interface ISearch {
    onChange: (param: IPagination) => void;
}

const StudentSearchScene = forwardRef(({ onChange }: ISearch, ref) => {
    const [searchText, setSearchText] = useState<string>('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        onChange({
            search: searchText,
        });
    };
    useImperativeHandle(ref, () => ({
        clearInput: () => {
            setSearchText('');
        },
    }));

    return (
        <>
            <Input
                placeholder="Search"
                value={searchText}
                onChange={handleInputChange}
                onPressEnter={handleSearch}
                suffix={<SearchOutlined onClick={handleSearch} />}
            />
        </>
    );
});

export default StudentSearchScene;
