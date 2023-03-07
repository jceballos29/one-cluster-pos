/** @format */

import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import { userAdapter } from './adapters/user.adapter';
import { Loader } from './components';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { AuthGuard, PublicGuard } from './guards';
import useCallAndLoad from './hooks/useCallAndLoad';
import { login } from './redux/states/auth.slice';
import { session, setAccessToken } from './services/auth.service';
import { UserResponse } from './types';

const Login = React.lazy(() => import('./pages/login/login'));
const PointOfSale = React.lazy(
	() => import('./pages/point-of-sale/point-of-sale'),
);
const Selector = React.lazy(
	() => import('./pages/selector/selector'),
);

function App() {
	const { callEndpoint } = useCallAndLoad();
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const validateSession = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					setAccessToken(token);
					const response = await callEndpoint(session());
					if (response.status === 200) {
						dispatch(
							login(userAdapter(response.data as UserResponse)),
						);
					}
					setLoading(false);
				} catch (e) {}
			} else {
				setLoading(false);
			}
		};

		validateSession();
	}, []);

	return (
		<main className='w-full h-screen overflow-hidden bg-blue-50'>
			{loading ? (
				<Loader />
			) : (
				<Suspense fallback={<Loader />}>
					<BrowserRouter>
						<Routes>
							<Route
								index
								element={<Navigate to={PrivateRoutes.POS} />}
							/>
							<Route element={<PublicGuard />}>
								<Route
									path={PublicRoutes.LOGIN}
									element={<Login />}
								/>
							</Route>
							<Route
								path={PrivateRoutes.SELECTOR}
								element={<Selector />}
							/>
							<Route element={<AuthGuard />}>
								<Route
									path={PrivateRoutes.POS}
									element={<PointOfSale />}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</Suspense>
			)}
		</main>
	);
}

export default App;
