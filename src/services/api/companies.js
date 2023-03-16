import axiosInstance from './index';

export const getAll = async (params) => {
	const data = await axiosInstance.get('/companies', {
		params,
	});

	return data?.data;
};

export const createCompany = async (body) => {
	const data = await axiosInstance.post('/companies', body);

	return data?.data;
};

export const editCompany = async ({ id, body }) => {
	const data = await axiosInstance.patch(`/companies/${id}`, body);

	return data?.data;
};

export const getInvestments = async ({ id, params }) => {
	const data = await axiosInstance.get(`/companies/${id}/investments`, {
		params,
	});

	return data?.data;
};
