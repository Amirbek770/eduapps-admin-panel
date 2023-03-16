import { useMemo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useProfileQuery from '../hooks/queries/useProfileQuery';

const Protect = ({ children, allowTo, protect, path }) => {
	let location = useLocation();
	// let { data: profile } = useProfileQuery();
	let  profile = useProfileQuery();

	const auth = useMemo(() => {
		const token = localStorage.getItem('token');

		return {
			token,
		};
	}, [localStorage.token]);

	const currentPage = useMemo(() => {
		if (path === location.pathname) return true;

		return false;
	}, [location.pathname]);

	if (protect && !auth.token) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	if (auth.token && !protect) {
		return <Navigate to="/dashboard" />;
	}

	if (protect && profile && !allowTo.includes(profile?.role)) {
		return <Navigate to="/dashboard" state={{ from: location }} />;
	}

	return children;
};

export default Protect;
