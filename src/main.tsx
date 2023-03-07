/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';

axios.defaults.baseURL = 'https://point-of-sale-api-production.up.railway.app';

ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
