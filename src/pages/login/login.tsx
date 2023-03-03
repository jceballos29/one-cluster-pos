/** @format */
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCallAndLoad from '../../hooks/useCallAndLoad';
import * as AuthService from '../../services/auth.service';
import { Database, LoginResponse } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/states/auth.slice';
import axios from 'axios';
import { userAdapter } from '../../adapters/user.adapter';
import { AppStore } from '../../redux/store';
import { useEffect } from 'react';
import {
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import { PrivateRoutes } from '../../constants/routes';
import { fetchDatabases } from '../../services/pos.service';
import { databasesAdapter } from '../../adapters/database.adapter';

import Loader from '../../components/loader';
import { warehouses } from '../../data';

export const loader = async () => {
	const response = await fetchDatabases();
	const data = databasesAdapter(response);
	return data;
};

const LoginFormSchema = yup
	.object({
		database: yup.string().required('La base de datos es requerida'),
		username: yup.string().required('El usuario es requerido'),
		password: yup.string().required('La contraseña es requerida'),
	})
	.required();

function Login() {
	const response = useLoaderData();
	const databases = response as Database[];
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LoginFormSchema),
	});
	const { loading, callEndpoint } = useCallAndLoad();
	const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const navigation = useNavigation();

	const onSubmit = async (data: FieldValues) => {
		// try {
		// 	const { data: response } = await callEndpoint(
		// 		AuthService.login({
		// 			database: data.database,
		// 			username: data.username,
		// 			password: data.password,
		// 		}),
		// 	);
		// 	const result = response as LoginResponse;
		// 	const user = userAdapter(result.user);
		// 	localStorage.setItem('token', result.token);
		// 	axios.defaults.headers.common.Authorization = `Bearer ${result.token}`;
		// 	dispatch(
		// 		login({
		// 			isAuthenticated: true,
		// 			token: result.token,
		// 			session: result.session,
		// 			database: result.database,
		// 			user,
		// 		}),
		// 	);
		// } catch (e) {}
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate(`/${PrivateRoutes.POS}`, { replace: true });
		}
	}, [isAuthenticated]);

	return navigation.state === 'loading' ? (
		<Loader />
	) : (
		<div className='w-full h-full flex flex-col items-center justify-center select-none'>
			<h1 className='w-full max-w-md text-center font-black text-7xl leading-none mb-7'>
				LICORERA SALVADOR
			</h1>
			<div className='w-full max-w-lg p-14 rounded-xl shadow-lg bg-white mb-7'>
				<form
					className='w-full h-full'
					onSubmit={handleSubmit(onSubmit)}
				>
					<h2 className='font-bold text-2xl leading-8 mb-14'>
						Iniciar Sesión
					</h2>
					<div className='flex flex-col mb-3'>
						<label
							className='text-sm font-bold text-gray-700 flex flex-col items-start w-full'
							htmlFor='username'
						>
							<span className='flex w-full text-sm text-gray-700 font-semibold mb-1'>
								Base de datos
								{errors.database && (
									<span className='text-red-500 text-xs ml-auto font-light'>
										{errors.database?.message?.toString()}
									</span>
								)}
							</span>
							<select
								className={`w-full px-3 py-2 text-sm leading-6 font-normal  text-gray-900 capitalize border ${
									errors.database
										? 'border-red-500'
										: 'border-gray-300'
								} rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500 placeholder:font-light placeholder:text-gray-400 cursor-pointer`}
								id='database'
								{...register('database')}
							>
								<option className='normal-case'>
									Selecciona una base de datos
								</option>
								{warehouses.map((item) => (
									<option
										key={item.id}
										value={item.name}
										className='text-gray-900 capitalize'
									>
										{item.name}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className='flex flex-col mb-3'>
						<label
							className='text-sm font-bold text-gray-700 flex flex-col items-start w-full'
							htmlFor='username'
						>
							<span className='flex w-full text-sm text-gray-700 font-semibold mb-1'>
								Usuario
								{errors.username && (
									<span className='text-red-500 text-xs ml-auto font-light'>
										{errors.username?.message?.toString()}
									</span>
								)}
							</span>
							<input
								className={`w-full px-3 py-2 text-sm leading-6 font-normal text-gray-900 border ${
									errors.username
										? 'border-red-500'
										: 'border-gray-300'
								} rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500 placeholder:font-light placeholder:text-gray-400`}
								id='username'
								type='text'
								placeholder='usuario'
								{...register('username')}
							/>
						</label>
					</div>
					<div className='flex flex-col mb-14'>
						<label
							className='mb-2 text-sm font-bold text-gray-700 flex flex-col items-start w-full'
							htmlFor='password'
						>
							<span className='flex w-full text-sm text-gray-700 font-semibold mb-1'>
								Contraseña
								{errors.password && (
									<span className='text-red-500 text-xs ml-auto font-light'>
										{errors.password?.message?.toString()}
									</span>
								)}
							</span>
							<input
								className={`w-full px-3 py-2 text-sm leading-6 font-normal text-gray-900 border ${
									errors.password
										? 'border-red-500'
										: 'border-gray-300'
								} rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500 placeholder:font-light placeholder:text-gray-400`}
								id='password'
								type='password'
								placeholder='***********'
								{...register('password')}
							/>
						</label>
					</div>
					<button
						type='submit'
						className={`w-full flex items-center justify-center text-white font-medium ${
							loading ? 'bg-gray-500' : 'bg-blue-600'
						} rounded-md px-3 py-2.5`}
						disabled={loading}
					>
						{loading ? (
							<>
								<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
								<span>Cargando...</span>
							</>
						) : (
							'Iniciar Sesión'
						)}
					</button>
				</form>
			</div>
			<p className='text-gray-400 font-normal text-sm leading-5 '>
				{new Date().getFullYear()} - One Cluster &#169;
			</p>
		</div>
	);
}

export default Login;