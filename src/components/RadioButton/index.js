import React, { useMemo, useState } from 'react';

import cls from './style.module.scss';

function RadioButton({ name, value, type, label, checked, ...props }) {
	const labelStyle = useMemo(() => {
		switch (type) {
			case 'success':
				return cls.success;
			case 'error':
				return cls.error;
			default:
				return '';
		}
	}, [type]);

	return (
		<label className={`${cls.input} ${labelStyle}`}>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				{...props}
			/>
			<span>{label}</span>
		</label>
	);
}

export default RadioButton;
