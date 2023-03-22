import { Button } from 'antd';
import { useRef } from 'react';
import { IModal } from 'src/models';
import { StudentForm, StudentList, StudentSearch } from 'src/scenes/students';

function StudentPage() {
    const studentFormRef = useRef<IModal>(null);
    const showModal = () => {
        studentFormRef.current && studentFormRef.current.showModal();
    };
    return (
        <div className="bg-white relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <div className="w-1/2">
                    <StudentSearch />
                </div>
                <div className="w-1/2 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Button type="primary" onClick={showModal}>
                        Add Student
                    </Button>
                    <StudentForm ref={studentFormRef} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <StudentList />
            </div>
        </div>
    );
}

export default StudentPage;
