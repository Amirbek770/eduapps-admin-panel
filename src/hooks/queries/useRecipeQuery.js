import { useQuery } from 'react-query';

import { getAll } from '../../services/api/recipe';

export const useRecipeQuery = (options) => {
	return useQuery('recipe', () => getAll(options.params), {
		...options,
	});
};

