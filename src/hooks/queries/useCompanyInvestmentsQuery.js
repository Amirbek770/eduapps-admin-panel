import { useQuery } from 'react-query';

import { getInvestments } from '../../services/api/companies';

const useCompanyInvestmentsQuery = (options) => {
	return useQuery('company-investments', () => getInvestments(options), {
		...options,
	});
};

export default useCompanyInvestmentsQuery;
