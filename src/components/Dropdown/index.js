import React, { useState, useMemo } from 'react';
import { Iconly } from 'react-iconly';

import cls from './style.module.scss';

function Dropdown({ options, value, onChange, name, placeHolder }) {
	// console.log("Dropdown options", options, placeHolder);
	const [isOpen, setIsOpen] = useState();
	const active = useMemo(() => {
		return options?.find((option) => option?._id == value) || placeHolder;
	}, [value]);

	function handleSelect(option) {
		setIsOpen(false);

		onChange?.(name, option?._id);
	}

	return (
		<div onClick={() => setIsOpen(!isOpen)} className={cls.dropdown}>
			<p className={cls.label}>{active.title}</p>

			<Iconly
				name={isOpen ? 'ChevronUp' : 'ChevronDown'}
				className={cls.icon}
				set="light"
			/>

			{isOpen && (
				<div className={cls.options}>
					{options.map((item, index) => (
						<div
							key={index}
							onClick={() => handleSelect(item)}
							className={cls.option}
						>
							{item.title}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
