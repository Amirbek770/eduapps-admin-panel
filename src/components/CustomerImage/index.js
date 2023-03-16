import React from 'react';
import cls from './style.module.scss';
import { Image } from 'react-iconly';

const CustomerImage = ({ data }) => {
	return (
		<div className={cls.container}>
			<div className={cls.customerImg}>
				{data?.image?.url ? (
					<img src={data?.image?.url} alt="#" />
				) : (
					<Image size={80} />
				)}
			</div>
			<h2 className={cls.name}>{data?.fullName}</h2>
			<p className={cls.referalId}>
				ID: <span>{data?._id}</span>
			</p>
			{/* <p className={cls.invested}>Invested: ${data?.investments}</p> */}
			<p className={cls.balance}>Balance: ${data?.balance}</p>
		</div>
	);
};

export default CustomerImage;
