import { useQuery } from 'react-query';

import { getAll } from '../../services/api/category';

export const useCategoryQuery = (options) => {
	return useQuery('category/all', () => getAll(options.params), {
		...options,
	});
};

