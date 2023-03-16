import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editRecipe } from '../../services/api/recipe';

const useEditRecipeMutation = () => {
	return useMutation(editRecipe, {
		onSuccess: () => {
			queryClient.invalidateQueries('recipe');
		},
	});
};

export default useEditRecipeMutation;
