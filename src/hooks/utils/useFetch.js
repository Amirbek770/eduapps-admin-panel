import { useEffect } from 'react';
import useLocationQuery from '../../hooks/utils/useLocationQuery';

const useFetch = ({ path, useQuery, params = {}, ...options }) => {
	const { query, enabled } = useLocationQuery(path);

	Object.keys(params).map((key) => query?.append(key, params[key]));

	const data = useQuery({
		...options,
		params: query,
		enabled,
		name: params.type,
	});

	useEffect(() => {
		if (enabled) data.refetch();
	}, [query]);

	return data;
};

export default useFetch;
