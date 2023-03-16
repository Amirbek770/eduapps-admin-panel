import { useQuery } from "react-query";
import { getAll, getFreeAll, getIntroAll } from "../../services/api/courses";


export const useCourseQuery = (options) => {
    return useQuery('course/all', () => getAll(options), {
        ...options
    })
}

export const useFreeCourseQuery = (options) => {
    return useQuery('course/free', () => getFreeAll(options), {
        ...options
    })
}

export const useIntroQuery = (options) => {
    return useQuery('intro', () => getIntroAll(options), {
        ...options
    })
}
