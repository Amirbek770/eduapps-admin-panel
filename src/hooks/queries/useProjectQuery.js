import { useQuery } from 'react-query';

import { getAll } from '../../services/api/project';

export const useProjectQuery = (options) => {
	return useQuery('project/all', () => getAll(options.params), {
		...options,
	});
};

