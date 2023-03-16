import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	config.headers['Authorization'] = `Bearer ${token}`;

	return config;
});

axiosInstance.interceptors.response.use((config) => config);

export default axiosInstance;
