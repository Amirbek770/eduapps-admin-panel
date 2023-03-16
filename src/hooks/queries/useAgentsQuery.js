import { useQuery } from 'react-query';

import { getAll } from '../../services/api/agent';

const useAgentsQuery = (options) => {
	return useQuery('agents', () => getAll(options.params), {
		...options,
	});
};

export default useAgentsQuery;
