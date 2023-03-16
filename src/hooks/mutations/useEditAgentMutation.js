import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editAgent } from '../../services/api/agent';

const useEditAgentMutation = () => {
	return useMutation(editAgent, {
		onSuccess: () => {
			queryClient.invalidateQueries('agents');
		},
	});
};

export default useEditAgentMutation;
