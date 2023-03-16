import axiosInstance from "./index";

export const getPreRegister = async (params) => {
  const data = await axiosInstance.get('/preregister', {
    params,
  });

  return data?.data;
};