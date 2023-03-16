import axiosInstance from './index';

export const getAll = async (params) => {
	const data = await axiosInstance.get('/transactions', {
		params,
	});

	return data?.data;
};

export const accept = async ({ id, body }) => {
	const data = await axiosInstance.patch(`/transactions/${id}/accept`, body);

	return data?.data;
};

export const reject = async ({ id }) => {
	const data = await axiosInstance.patch(`/transactions/${id}/reject`);

	return data?.data;
};

export const getPendingCounts = async () => {
	const data = await axiosInstance.get(`/transactions/pending`);

	return data?.data?.data;
};
