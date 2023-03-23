import { Button } from 'antd';
import { useRef } from 'react';
import { IModal, IPagination } from 'src/models';
import { StudentForm, StudentList, StudentSearch } from 'src/scenes/students';
import { IStudentListRef } from 'src/scenes/students/StudentList.scene';

function StudentPage() {
    const studentFormRef = useRef<IModal>(null);
    const studentSearchRef = useRef<any>(null);
    const showModal = () => {
        studentFormRef.current && studentFormRef.current.showModal();
    };
    const studentListRef = useRef<IStudentListRef>(null);

    const handleSearch = (param: IPagination) => {
        studentListRef && studentListRef.current!.onSearch(param);
    };

    const clearInputSearch = () => {
        studentSearchRef && studentSearchRef.current!.clearInput();
    };

    return (
        <div className="bg-white relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <div className="w-1/2">
                    <StudentSearch onChange={handleSearch} ref={studentSearchRef} />
                </div>
                <div className="w-1/2 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Button type="primary" onClick={showModal}>
                        Add Student
                    </Button>
                    <StudentForm ref={studentFormRef} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <StudentList ref={studentListRef} clearInputSearch={clearInputSearch} />
            </div>
        </div>
    );
}

export default StudentPage;
