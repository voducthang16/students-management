import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

interface ISearch {
    onChange: (keyword: string) => void;
}

function StudentSearchScene({ onChange }: ISearch) {
    const [searchText, setSearchText] = useState<string>('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        onChange(searchText);
    };
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
}

export default StudentSearchScene;
