import { useQuery } from 'react-query';

import { getDaily } from '../../services/api/statistics';

const useDailyStatisticsQuery = (options) => {
	return useQuery('statistics-daily', getDaily, {
		...options,
	});
};

export default useDailyStatisticsQuery;
