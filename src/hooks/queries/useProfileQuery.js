import { useQuery } from 'react-query';

import { getProfile } from '../../services/api/admin';

const useProfileQuery = (options) => {
	// return useQuery('profile', getProfile, { ...options });
	let data = {
		name: 'Amirbek',
		login: 'admin',
		password: '1234',
		token: 'qwerty12345',
		role: 'superadmin'
	}
	return data;
};

export default useProfileQuery;
