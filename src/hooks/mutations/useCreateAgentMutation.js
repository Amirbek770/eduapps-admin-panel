import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import {createAgent} from "../../services/api/agent";

const useCreateAgentMutation = () => {
	return useMutation(createAgent, {
		onSuccess: () => {
			queryClient.invalidateQueries('agents');
		},
	});
};

export default useCreateAgentMutation;
