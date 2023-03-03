/** @format */

import {
	BrowserRouter,
	Navigate,
	Route,
	Routes
} from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './constants/routes';
import { Login, PointOfSale } from './pages';

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
