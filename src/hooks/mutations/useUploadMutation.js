import { useMutation } from 'react-query';
import queryClient from '../../services/api';

const useUploadMutation = (options) => {
    return useMutation(
        async (variables) => {
            const formData = new FormData();

            const { file } = variables;
            formData.append('file', file);
            return await queryClient.post(`/companies/image`, formData);
        },
        { ...options },
    );
};

export default useUploadMutation;
