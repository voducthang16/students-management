import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '~components/Loading';
import { status } from '~store/slice/loading.slice';
import { useAppSelector } from './hooks';
import DefaultLayout from './layouts/DefaultLayout';
import TaskPage from './pages/tasks';

const Students = React.lazy(() => import('./pages/students'));

function App() {
    const isLoading = useAppSelector(status);
    console.log(isLoading);
    return (
        <div>
            {isLoading ? <Loading /> : <></>}
            <Routes>
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
            </Routes>
        </div>
    );
}

export default App;
