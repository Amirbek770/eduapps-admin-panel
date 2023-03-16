import axiosInstance from './index';

export const getProfile = async () => {
	const data = await axiosInstance.get('/admins/profile');

	return data?.data?.data;
};

export const editProfile = async (body) => {
	const data = await axiosInstance.patch('/admins/profile', body);

	return data?.data?.data;
};

export const getAll = async (params) => {
	const data = await axiosInstance.get('/admins', {
		params,
	});

	return data?.data;
};

export const createAdmin = async (body) => {
	const data = await axiosInstance.post('/admins', body);

	return data?.data;
};

export const editAdmin = async ({ id, body }) => {
	const data = await axiosInstance.patch(`/admins/${id}`, body);

	return data?.data;
};

export const deleteAdmin = async ({ id }) => {
	const { data } = await axiosInstance.delete(`/admins/${id}`);

	return data?.data;
};
