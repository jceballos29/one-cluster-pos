/** @format */

import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../constants/routes';

function AuthGuard() {
	const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate to={PublicRoutes.LOGIN} />
	);
}

export default AuthGuard;
