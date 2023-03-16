import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { reject } from '../../services/api/transaction';

const useTransactionRejectMutation = () => {
	return useMutation(reject, {
		onSuccess: () => {
			queryClient.invalidateQueries('topup');
			queryClient.invalidateQueries('invest');
			queryClient.invalidateQueries('return');
			queryClient.invalidateQueries('withdraw');
			queryClient.invalidateQueries('pending-counts');
		},
	});
};

export default useTransactionRejectMutation;
