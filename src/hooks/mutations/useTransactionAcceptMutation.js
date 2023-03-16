import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { accept } from '../../services/api/transaction';

const useTransactionAcceptMutation = () => {
	return useMutation(accept, {
		onSuccess: () => {
			queryClient.invalidateQueries('topup');
			queryClient.invalidateQueries('invest');
			queryClient.invalidateQueries('return');
			queryClient.invalidateQueries('withdraw');
			queryClient.invalidateQueries('pending-counts');
		},
	});
};

export default useTransactionAcceptMutation;
