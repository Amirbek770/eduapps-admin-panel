import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editAdmin } from '../../services/api/admin';

const useEditAdminMutation = () => {
	return useMutation(editAdmin, {
		onSuccess: () => {
			queryClient.invalidateQueries('admins');
		},
	});
};

export default useEditAdminMutation;
