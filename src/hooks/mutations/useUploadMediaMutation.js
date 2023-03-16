import { useMutation } from 'react-query';

import { uploadMedia } from '../../services/api/media';

const useUploadMediaMutation = () => {
	return useMutation(uploadMedia);
};

export default useUploadMediaMutation;
