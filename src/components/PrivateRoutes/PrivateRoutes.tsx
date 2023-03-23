import { Navigate, Outlet } from 'react-router-dom';
import { localStorageMethod } from 'utils';

function PrivateRoutes() {
    const isLoggedIn = Boolean(localStorageMethod.get('login'));
    console.log(isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />;
}

export default PrivateRoutes;
