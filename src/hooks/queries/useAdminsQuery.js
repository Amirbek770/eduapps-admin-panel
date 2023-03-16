import { useQuery } from 'react-query';

import { getAll } from '../../services/api/admin';

const useAdminsQuery = (options) => {
	return useQuery('admins', () => getAll(options.params), {
		...options,
	});
};

export default useAdminsQuery;
