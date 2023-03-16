import axiosInstance from "./index"

export const getAll = async () => {
    const data = await axiosInstance.get('/client/v1/course')
    console.log('getALl course', data?.data);
    return data?.data
}

export const getFreeAll = async () => {
    const data = await axiosInstance.get('freecourse/all')
    
    return data?.data
}

export const getIntroAll = async () => {
    const data = await axiosInstance.get('videohome/all')
    
    return data?.data
}

export const getSortCourse = async (params) => {
    const data = await axiosInstance.get('course/getSort', {
        params
    })

    return data?.result
}