import { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router';

const useLocationQuery = (path) => {
	const { search, pathname } = useLocation();
	const match = useMatch(path);

	return useMemo(() => {
		if (match) {
			const query = new URLSearchParams(search);
			return {
				query,
				enabled: true,
			};
		}

		return {
			query: null,
			enabled: false,
		};
	}, [pathname, search]);
};

export default useLocationQuery;
