import { useQuery } from 'react-query';

import { getAll } from '../../services/api/transaction';

const useTransactionQuery = (options) => {
	return useQuery(options?.name ?? 'deposits', () => getAll(options.params), {
		...options,
	});
};

export default useTransactionQuery;
