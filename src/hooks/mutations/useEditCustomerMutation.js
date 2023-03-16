import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editCustomer } from '../../services/api/customers';

const useEditCustomerMutation = () => {
	return useMutation(editCustomer, {
		onSuccess: () => {
			queryClient.invalidateQueries('users');
		},
	});
};

export default useEditCustomerMutation;
