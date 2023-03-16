import { useQuery } from 'react-query';

import { getOverall } from '../../services/api/statistics';

const useOverallStatisticsQuery = (options) => {
	return useQuery('statistics-overall', getOverall, {
		...options,
	});
};

export default useOverallStatisticsQuery;
