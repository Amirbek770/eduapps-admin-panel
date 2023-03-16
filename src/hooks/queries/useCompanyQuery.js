import { useQuery } from 'react-query';

import { getAll } from '../../services/api/project';

const useCompanyQuery = (options) => {
	return useQuery('project', () => getAll(options.params), {
		...options,
	});
};

export default useCompanyQuery;
