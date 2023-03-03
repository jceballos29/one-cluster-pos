/** @format */

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { AppStore } from '../redux/store';

export interface RoleGuardProps {
	role: string;
}

function RoleGuard({ role }: RoleGuardProps) {
	const { user } = useSelector((store: AppStore) => store.auth);
	return user.role === role ? <Outlet /> : <Navigate to='/' />;
}

export default RoleGuard;
