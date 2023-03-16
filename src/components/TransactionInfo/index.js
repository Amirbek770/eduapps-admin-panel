import moment from 'moment';

import InfoRow from '../InfoRow';

import cls from './style.module.scss';

const InvestmentInfo = ({ data }) => {
	const state = {
		accepted: 'Accepted',
		rejected: 'Rejected',
	};

	return (
		<div className={cls.containerFluid}>
			<div className={cls.container}>
				<InfoRow title={'Name'} value={data?.user?.fullName} />
				<InfoRow title={'Email'} value={data?.user?.email} />
				<InfoRow title={'Amount'} value={data?.amount} />
				<InfoRow
					title={'Requested Date'}
					value={moment(data?.createdAt).format('HH:mm, yy-MM-DD')}
				/>
				<InfoRow
					title={`${state[data?.state]} Date`}
					value={moment(data?.updatedAt).format('HH:mm, yy-MM-DD')}
				/>
			</div>
		</div>
	);
};

export default InvestmentInfo;
