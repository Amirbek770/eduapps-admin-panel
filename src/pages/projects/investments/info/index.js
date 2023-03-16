import moment from 'moment';

import InfoRow from '../../../../components/InfoRow';
import CustomerImage from '../../../../components/CustomerImage';

import cls from './style.module.scss';

const InvestmentInfo = ({ data }) => {
	return (
		<div className={cls.containerFluid}>
			<CustomerImage data={data?.user} />

			<div className={cls.container}>
				<InfoRow title={'Name'} value={data?.user?.fullName} />
				<InfoRow title={'Email'} value={data?.user?.email} />
				<InfoRow title={'Invested Amount'} value={data?.amount} />
				<InfoRow
					title={'Created Date'}
					value={moment(data?.createdAt).format('HH:mm, yy-MM-DD')}
				/>
				<InfoRow title={'Duration'} value={data?.duration} />
			</div>
		</div>
	);
};

export default InvestmentInfo;
