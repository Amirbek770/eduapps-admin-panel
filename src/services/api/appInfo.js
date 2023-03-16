import axiosInstance from "./index"

export const getAll = async () => {
    const data = await axiosInstance.get('appinfo/all')
    
    return data?.data
}