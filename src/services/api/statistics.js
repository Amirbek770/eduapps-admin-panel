import axiosInstance from './index';

export const getDaily = async () => {
	const data = await axiosInstance.get('/statistics/daily');

	return data?.data?.data;
};

export const getMonthly = async () => {
	const data = await axiosInstance.get('/statistics/monthly');

	return data?.data?.data;
};

export const getOverall = async () => {
	const data = await axiosInstance.get('/statistics/overall');

	return data?.data?.data;
};
