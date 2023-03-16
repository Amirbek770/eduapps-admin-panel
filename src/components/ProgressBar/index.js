import React from 'react';

import cls from './style.module.scss';

const ProgressBar = ({ className }) => {
	return (
		<div className={`${className} ${cls.container}`}>
			<div className={cls.progress}></div>
		</div>
	);
};

export default ProgressBar;
