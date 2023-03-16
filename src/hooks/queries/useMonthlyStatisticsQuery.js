import { useQuery } from 'react-query';

import { getMonthly } from '../../services/api/statistics';

const useMonthlyStatisticsQuery = (options) => {
	return useQuery('statistics-monthly', getMonthly, {
		...options,
	});
};

export default useMonthlyStatisticsQuery;
