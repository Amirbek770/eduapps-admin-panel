import { Image } from 'react-iconly';

import cls from './style.module.scss';

const Avatar = ({ src, ...props }) => {
	return (
		<div className={cls.container}>
			{src ? (
				<img className={cls.image} src={src} {...props} />
			) : (
				<Image size={22} />
			)}

			{src && <img className={cls.hover} src={src} {...props} />}
		</div>
	);
};

export default Avatar;
