import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { createAdmin } from '../../services/api/admin';

const useCreateAdminMutation = () => {
	return useMutation(createAdmin, {
		onSuccess: () => {
			queryClient.invalidateQueries('admins');
		},
	});
};

export default useCreateAdminMutation;
