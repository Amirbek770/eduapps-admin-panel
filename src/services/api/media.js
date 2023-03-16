import axiosInstance from './index';

export const uploadMedia = async (file) => {
	const formData = new FormData();

	formData.append('file', file);

	const data = await axiosInstance.post('/media/upload', formData);

	return data?.data;
};
