import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { deleteAdmin } from '../../services/api/admin';

const useDeleteAdminMutation = () => {
	return useMutation(deleteAdmin, {
		onSuccess: () => {
			queryClient.invalidateQueries('admins');
		},
	});
};

export default useDeleteAdminMutation;
