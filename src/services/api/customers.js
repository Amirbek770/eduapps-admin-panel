import axiosInstance from './index';

export const getAll = async (params) => {
	const data = await axiosInstance.get('/client/v1/user', {
		params,
	});

	return data?.data;
};

export const editCustomer = async ({ id, body }) => {
	const data = await axiosInstance.put(`/user/${id}`, body);
	console.log('editCustomer', data);
	return data?.result;
};
