import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import {createCompany} from "../../services/api/companies";


const useCreateCompanyMutation = () => {
	return useMutation(createCompany, {
		onSuccess: () => {
			queryClient.invalidateQueries('companies');
		},
	});
};

export default useCreateCompanyMutation;
