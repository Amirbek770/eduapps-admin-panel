import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editCompany } from '../../services/api/companies';

const useEditCompanyMutation = () => {
	return useMutation(editCompany, {
		onSuccess: () => {
			queryClient.invalidateQueries('companies');
		},
	});
};

export default useEditCompanyMutation;
