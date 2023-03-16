import { Iconly } from 'react-iconly';

import cls from './style.module.scss';

const Sidebar = ({ title, children, open, close }) => {
	return (
		<div className={`${cls.container} ${open && cls.containerOpen}`}>
			<div
				onClick={close}
				className={`${cls.mask} ${open && cls.containerOpen}`}
			/>

			<div className={`${cls.content} ${open && cls.contentOpen}`}>
				<div className={cls.header}>
					<h1 className={cls.title}>{title}</h1>
					<Iconly
						className={cls.icon}
						onClick={close}
						name={'CloseSquare'}
					/>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Sidebar;
