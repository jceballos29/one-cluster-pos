/** @format */
import { databasesAdapter } from '@/adapters/pos.adapter';
import { userAdapter } from '@/adapters/user.adapter';
import { Loader } from '@/components';
import useCallAndLoad from '@/hooks/useCallAndLoad';
import { login } from '@/redux/states/auth.slice';
import {
	login as LoginService,
	setAccessToken,
} from '@/services/auth.service';
import { fetchDatabases } from '@/services/pos.service';
import {
	Database,
	DatabasesResponse,
	LoginRequest,
	LoginResponse,
} from '@/types';
import { Listbox, Transition } from '@headlessui/react';
import {
	CheckIcon,
	ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LoginFormSchema } from './login.schema';

export interface LoginProps {}
export interface LoginStates {
	databases: Database[];
	selectedDatabase: Database | null;
}

const Login: React.FC<LoginProps> = () => {
	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LoginFormSchema),
	});
	const { loading, callEndpoint } = useCallAndLoad();
	const { loading: logging, callEndpoint: callLoginEndpoint } =
		useCallAndLoad();

	const [databases, setDatabases] = useState<
		LoginStates['databases']
	>([]);
	const [selectedDatabase, setSelectedDatabase] =
		useState<LoginStates['selectedDatabase']>(null);

	const dispatch = useDispatch();

	const handleSelectDatabase = (database: Database) => {
		setSelectedDatabase(database);
		setValue('database', database.id);
		clearErrors('database');
	};

	const onSubmit = async (data: FieldValues) => {
		try {
			const response = await callLoginEndpoint(
				LoginService(data as LoginRequest),
			);
			const { user, token } = response.data as LoginResponse;
			const session = `${user.username}:${user._id}:${token}`
			setAccessToken(session);
			dispatch(login(userAdapter(user)));
		} catch (e) {}
	};

	useEffect(() => {
		const getWarehouses = async () => {
			try {
				const response = await callEndpoint(fetchDatabases());
				const databases = databasesAdapter(
					response.data as DatabasesResponse,
				);
				setDatabases(databases);
			} catch (error) {
				setDatabases([]);
			}
		};

		getWarehouses();
	}, []);

	return loading ? (
		<Loader />
	) : (
		databases && (
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
								className='text-sm font-bold text-slate-700 flex flex-col items-start w-full'
								htmlFor='username'
							>
								<span className='flex w-full text-sm text-slate-700 font-semibold mb-1'>
									Base de datos
									{errors.database && (
										<span className='text-red-500 text-xs ml-auto font-light'>
											{errors.database?.message?.toString()}
										</span>
									)}
								</span>
								<input
									type='text'
									className='hidden'
									{...register('database')}
								/>
								<Listbox
									value={selectedDatabase}
									onChange={handleSelectDatabase}
								>
									<div className='relative w-full'>
										<Listbox.Button
											className={`relative w-full cursor-pointer rounded bg-white py-2 pl-3 pr-10 text-left text-sm shadow font-normal border ${
												errors.database
													? 'border-red-500'
													: 'border-gray-300'
											} focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500`}
										>
											<span
												className={`block truncate ${
													selectedDatabase
														? 'text-slate-900 capitalize'
														: 'text-slate-400 font-light'
												}`}
											>
												{selectedDatabase
													? selectedDatabase.name
													: 'Selecciona una base de datos'}
											</span>
											<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
												<ChevronUpDownIcon
													className='h-5 w-5 text-slate-400'
													aria-hidden='true'
												/>
											</span>
										</Listbox.Button>
										<Transition
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
												{databases.map((item) => (
													<Listbox.Option
														key={item.id}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 ${
																active
																	? 'bg-blue-100 text-blue-900'
																	: 'text-slate-900'
															}`
														}
														value={item}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate capitalize ${
																		selected
																			? 'font-medium'
																			: 'font-normal'
																	}`}
																>
																	{item.name}
																</span>
																{selected ? (
																	<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
																		<CheckIcon
																			className='h-5 w-5'
																			aria-hidden='true'
																		/>
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</label>
						</div>
						<div className='flex flex-col mb-3'>
							<label
								className='text-sm font-bold text-slate-700 flex flex-col items-start w-full'
								htmlFor='username'
							>
								<span className='flex w-full text-sm text-slate-700 font-semibold mb-1'>
									Usuario
									{errors.username && (
										<span className='text-red-500 text-xs ml-auto font-light'>
											{errors.username?.message?.toString()}
										</span>
									)}
								</span>
								<input
									className={`w-full px-3 py-2 text-sm leading-6 font-normal text-slate-900 border ${
										errors.username
											? 'border-red-500'
											: 'border-gray-300'
									} rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500 placeholder:font-light placeholder:text-slate-400`}
									id='username'
									type='text'
									placeholder='usuario'
									{...register('username')}
								/>
							</label>
						</div>
						<div className='flex flex-col mb-14'>
							<label
								className='mb-2 text-sm font-bold text-slate-700 flex flex-col items-start w-full'
								htmlFor='password'
							>
								<span className='flex w-full text-sm text-slate-700 font-semibold mb-1'>
									Contraseña
									{errors.password && (
										<span className='text-red-500 text-xs ml-auto font-light'>
											{errors.password?.message?.toString()}
										</span>
									)}
								</span>
								<input
									className={`w-full px-3 py-2 text-sm leading-6 font-normal text-slate-900 border ${
										errors.password
											? 'border-red-500'
											: 'border-gray-300'
									} rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-blue-500 placeholder:font-light placeholder:text-slate-400`}
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
								logging ? 'bg-slate-500' : 'bg-blue-600'
							} rounded-md px-3 py-2.5`}
							disabled={logging}
						>
							{logging ? (
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
				<p className='text-slate-400 font-normal text-sm leading-5 '>
					{new Date().getFullYear()} - One Cluster &#169;
				</p>
			</div>
		)
	);
};

export default Login;
