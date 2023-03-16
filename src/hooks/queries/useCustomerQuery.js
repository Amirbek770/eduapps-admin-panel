import { useQuery } from 'react-query';

import { getAll } from '../../services/api/customers';

export const useCustomersQuery = (options) => {
	return useQuery('user/all', () => getAll(options.params), {
		...options,
	});
};

