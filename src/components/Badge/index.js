import { useMemo } from 'react';

import cls from './style.module.scss';

const Badge = ({ label, type }) => {
	const color = useMemo(() => {
		switch (type) {
			case 'success':
				return cls.success;
			case 'error':
				return cls.error;
			default:
				return '';
		}
	});

	return <div className={[cls.container, color].join(' ')}>{label}</div>;
};

export default Badge;
