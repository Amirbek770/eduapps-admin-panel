import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import {createRecipe} from "../../services/api/recipe";


const useCreateRecipeMutation = () => {
	return useMutation(createRecipe, {
		onSuccess: () => {
			queryClient.invalidateQueries('recipe');
		},
	});
};

export default useCreateRecipeMutation;
