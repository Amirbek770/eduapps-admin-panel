import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import axiosInstance from '../../services/api';
import { login } from '../../services/api/auth';

const useLoginMutation = (options) => {
	return useMutation(login, {
		onSuccess: (data) => {
			queryClient.invalidateQueries('profile');
			if (data?.success)
				axiosInstance.defaults.headers.common[
					'Authorization'
				] = `Bearer ${data?.token}`;
		},
	});
};

export default useLoginMutation;
