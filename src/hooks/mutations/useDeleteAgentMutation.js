import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { deleteAgent } from '../../services/api/agent';

const useDeleteAgentMutation = () => {
	return useMutation(deleteAgent, {
		onSuccess: () => {
			queryClient.invalidateQueries('agents');
		},
	});
};

export default useDeleteAgentMutation;
