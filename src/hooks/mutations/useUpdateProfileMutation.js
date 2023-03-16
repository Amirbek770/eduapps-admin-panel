import { useMutation } from 'react-query';

import { queryClient } from '../../services/reactQuery';
import { editProfile } from "../../services/api/admin";

const useUpdateProfileMutation = () => {
    return useMutation(editProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries('profile');
        },
    });
};

export default useUpdateProfileMutation;
