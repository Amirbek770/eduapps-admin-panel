import { useMemo } from 'react';
import moment from 'moment';

import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';
import Badge from '../../components/Badge';

const useInvestmentsColumns = ({ actions, isLoading, actionDefaultStyle }) => {
	return useMemo(() => {
		const Cell = isLoading ? TextSkeleton : HighlightedText;

		const ActionCell = isLoading
			? () => null
			: ({ row }) => (
					<div style={{ display: 'flex', gap: 5 }}>
						{actions?.map((action, index) => (
							<Button
								key={index}
								icon={action.icon}
								className={action?.style?.container}
								iconClassName={action?.style?.icon}
								onClick={() => action.handler(row?.original)}
								iconSet="bold"
							>
								{action?.name}
							</Button>
						))}
					</div>
			  );

		return [
			{
				header: 'No',
				width: '1%',
				accessor: 'index',
				Cell: ({ row: { index }, data }) =>
					isLoading ? null : <Cell value={data?.length - index} />,
			},
			{
				header: 'Full Name',
				width: '5%',
				accessor: 'user.fullName',
				Cell,
			},
			{
				header: 'Amount',
				width: '5%',
				accessor: 'amount',
				Cell: ({ value, ...props }) => (
					<Cell value={value ? `$${value}` : null} {...props} />
				),
			},
			{
				header: 'Investment date',
				accessor: 'createdAt',
				width: '5%',
				Cell: (props) => (
					<Cell
						{...props}
						value={
							props.value &&
							moment(props.value).format('HH:mm, yy-MM-DD')
						}
					/>
				),
			},
			{
				header: 'Actions',
				accessor: 'actions',
				width: '1%',
				Cell: ActionCell,
			},
		];
	}, [isLoading]);
};

export default useInvestmentsColumns;
