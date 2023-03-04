/** @format */

import * as yup from 'yup';

export const LoginFormSchema = yup
	.object({
		database: yup.string().required('La base de datos es requerida'),
		username: yup.string().required('El usuario es requerido'),
		password: yup.string().required('La contraseña es requerida'),
	})
	.required();
