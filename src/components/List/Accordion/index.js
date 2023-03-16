import { Link } from 'react-router-dom';
import { Iconly } from 'react-iconly';

import cls from './style.module.scss';
import { useEffect, useState } from 'react';

function Accordion({
	title,
	icon,
	iconRight = 'ChevronRight',
	path,
	iconSet = 'bulk',
	iconRightSet = 'light',
	children,
	active,
	initialOpen,
	_key,
}) {
	const [open, setOpen] = useState(initialOpen);

	const toggle = () => {
		setOpen(!open);
	};

	useEffect(() => {
		setOpen(initialOpen);
	}, [initialOpen]);

	return (
		<div
			key={_key}
			className={`${cls.container} ${active ? cls.active : ''}`}
		>
			<Link className={cls.link} to={path}>
				<div
					className={`${cls.header} ${active ? cls.active : ''}`}
					onClick={toggle}
				>
					{icon && (
						<Iconly
							className={cls.icon}
							name={icon}
							set={iconSet}
						/>
					)}
					<p className={cls.title}>{title}</p>
					{iconRight && (
						<Iconly
							className={`${cls.iconRight} ${
								open ? cls.iconRightRotated : ''
							}`}
							name={iconRight}
							set={iconRightSet}
						/>
					)}
				</div>
			</Link>
			{open && <div>{children}</div>}
		</div>
	);
}

export default Accordion;
