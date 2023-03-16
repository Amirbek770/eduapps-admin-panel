import { Link } from 'react-router-dom';
import { Iconly } from 'react-iconly';

import cls from './style.module.scss';

function Item({
	title,
	titleTab,
	icon,
	iconRight,
	path,
	iconSet = 'bulk',
	iconRightSet = 'bulk',
	active,
	inner,
	count,
	_key,
}) {
	return (
		<Link key={_key} className={cls.link} to={path}>
			<div
				className={`${cls.container} ${active ? cls.active : ''} ${
					inner ? cls.inner : ''
				} ${inner && active ? cls.innerActive : ''}`}
			>
				{icon && (
					<Iconly className={cls.icon} name={icon} set={iconSet} />
				)}

				<p className={`${cls.title} ${titleTab ? cls.titleTab : ''}`}>
					{title}
				</p>

				{iconRight && (
					<Iconly
						className={cls.iconRight}
						name={iconRight}
						set={iconRightSet}
					/>
				)}

				{!!count && <div className={cls.badge}>{count}</div>}
			</div>
		</Link>
	);
}

export default Item;
