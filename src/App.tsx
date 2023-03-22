import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskPage from './pages/tasks';

const Students = React.lazy(() => import('./pages/students'));

function App() {
    return (
        <div className="bg-gray-50 p-3 sm:p-5">
            <div className="mx-auto container">
                <div className="grid grid-cols-4 gap-6">
                    {/* <div className="col-span-1">
                        <Sidebar />
                    </div> */}
                    <div className="col-span-4">
                        <Routes>
                            <Route path="/" element={<Students />} />
                            <Route path="/task" element={<TaskPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
