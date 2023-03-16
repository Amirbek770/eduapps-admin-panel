import cls from './style.module.scss';

export default function NoData({ text }) {
	return (
		<div className={cls.container}>
			<img src="/images/no-data.png" alt="" />
			<p>{text}</p>
		</div>
	);
}
