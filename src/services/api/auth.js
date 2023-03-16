import axiosInstance from './index';

export const login = async (body) => {
	const data = await axiosInstance.post('/user/admin/login', body);

	return data?.data;
};
