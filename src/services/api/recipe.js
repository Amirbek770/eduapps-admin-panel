import axiosInstance from './index';

export const getAll = async (params) => {
	const data = await axiosInstance.get('/client/v1/recipe', {
		params,
	});

	return data?.data;
};

export const createRecipe = async (body) => {
	const data = await axiosInstance.post('/client/v1/recipe', body);

	return data?.data;
};

export const editRecipe = async ({ id, body }) => {
	const data = await axiosInstance.put(`/client/v1/recipe/${id}`, body);

	return data?.data;
};

