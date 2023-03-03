/** @format */

import {
	Navigate,
	Outlet,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { Login, PointOfSale } from './pages';

let router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to={PrivateRoutes.POS} />,
	},
	{
		path: PublicRoutes.LOGIN,
		element: <Login />,
	},
	{
		path: PrivateRoutes.POS,
		element: <PointOfSale />,
	},
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
	return (
		<main className='w-full h-screen overflow-hidden bg-blue-50'>
			<RouterProvider router={router} />
		</main>
	);
}
