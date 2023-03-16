import React from 'react';

import Input from '../Input';

import cls from './style.module.scss';

function InfoRow({ title, value, editable = false, ...props }) {
	return (
		<div className={[cls.container, editable && cls.editable].join(' ')}>
			{title && <p className={cls.title}>{title}</p>}
			{editable ? (
				<Input className={cls.input} value={value} {...props} />
			) : (
				<p className={cls.value}>{value || '---'}</p>
			)}
		</div>
	);
}

export default InfoRow;
