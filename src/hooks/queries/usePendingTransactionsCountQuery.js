import { useQuery } from 'react-query';

import { getPendingCounts } from '../../services/api/transaction';

const usePendingTransactionsCountQuery = (options) => {
	return useQuery('pending-counts', getPendingCounts, {
		...options,
	});
};

export default usePendingTransactionsCountQuery;
