import { Navigate, Outlet } from 'react-router-dom';
import { localStorageMethod } from 'utils';

function PrivateRoutes() {
    const isLoggedIn = Boolean(localStorageMethod.get('login'));
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />;
}

export default PrivateRoutes;
