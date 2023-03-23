import PrivateRoutes from 'components/PrivateRoutes';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TaskPage from './pages/tasks';

const Students = React.lazy(() => import('./pages/students'));
const Login = React.lazy(() => import('./pages/login'));

function App() {
    return (
        <div>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route
                        path="/"
                        element={
                            <DefaultLayout>
                                <Students />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/task"
                        element={
                            <DefaultLayout>
                                <TaskPage />
                            </DefaultLayout>
                        }
                    />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
