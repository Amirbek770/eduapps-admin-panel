import axiosInstance from './index';

export const getAll = async (params) => {
	const data = await axiosInstance.get('/agents', {
		params,
	});

	return data?.data;
};

export const createAgent = async (body) => {
	const data = await axiosInstance.post('/agents', body);

	return data?.data;
};

export const editAgent = async ({ id, body }) => {
	const data = await axiosInstance.patch(`/agents/${id}`, body);

	return data?.data;
};

export const deleteAgent = async ({ id }) => {
	const data = await axiosInstance.delete(`/agents/${id}`);

	return data?.data;
};
