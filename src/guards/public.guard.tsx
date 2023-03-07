/** @format */

import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../constants/routes';

function PublicGuard() {
	const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

	return isAuthenticated ? (
    <Navigate to={PrivateRoutes.POS} />
    ) : (
		<Outlet />
	);
}

export default PublicGuard;
