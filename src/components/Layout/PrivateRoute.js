import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import Spinner from '../UI/Spinner';

const PrivateRoute = () => {
    const { loggedIn, loadingStatus } = useAuthStatus();

    if (loadingStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute;