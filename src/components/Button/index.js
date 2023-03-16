import React from 'react';
import { Iconly } from 'react-iconly';

import cls from './style.module.scss';

function Button({
	icon,
	rightIcon,
	iconClassName,
	iconSet = 'light',
	rightIconSet = 'light',
	className,
	children,
	disabled,
	...props
}) {
	return (
		<button
			className={`${cls.button} ${disabled && cls.disabled} ${className}`}
			disabled={disabled}
			{...props}
		>
			{icon && (
				<Iconly
					name={icon}
					className={` ${iconClassName} ${cls.icon}`}
					set={iconSet}
				/>
			)}
			{children}
			{rightIcon && (
				<Iconly
					name={rightIcon}
					className={` ${iconClassName} ${cls.icon}`}
					set={rightIconSet}
				/>
			)}
		</button>
	);
}

export default Button;
