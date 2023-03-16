import cls from './style.module.scss';
import Button from '../Button';
import React from 'react';

export default function Delete({ onDelete, onCancel, text }) {
	return (
		<div className={cls.container}>
			<img
				className={cls.deleteImages}
				src={'/images/deleteGirl.png'}
				alt=""
			/>
			<h3 className={cls.deleteAdminText}>{text}</h3>
			<div className={cls.actions}>
				<Button className={cls.cancelBtn} onClick={onCancel}>
					No{' '}
				</Button>
				<Button className={cls.deleteBtn} onClick={onDelete}>
					Yes{' '}
				</Button>
			</div>
		</div>
	);
}
