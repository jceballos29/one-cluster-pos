/** @format */

import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
} from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { Login, PointOfSale } from './pages';

// let router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <Navigate to={PrivateRoutes.POS} />,
// 	},
// 	{
// 		path: PublicRoutes.LOGIN,
// 		element: <Login />,
// 	},
// 	{
// 		path: PrivateRoutes.POS,
// 		element: <PointOfSale />,
// 	},
// ]);

export default function App() {
	return (
		<main className='w-full h-screen overflow-hidden bg-blue-50'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Navigate to={PrivateRoutes.POS} />}
					/>
					<Route path={PublicRoutes.LOGIN} element={<Login />} />
					<Route path={PrivateRoutes.POS} element={<PointOfSale />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}
