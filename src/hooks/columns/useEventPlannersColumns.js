import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';

const useAdminColumns = ({ actions, isLoading, actionDefaultStyle }) => {
	return useMemo(() => {
		const Cell = isLoading ? TextSkeleton : HighlightedText;

		const ActionCell = isLoading
			? () => null
			: ({ row }) => (
					<div style={{ display: 'flex', gap: 5 }}>
						{actions.map((action, index) => (
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
				header: 'Name',
				accessor: 'name',
				width: '3%',
				Cell,
			},
			{
				header: 'Event count',
				accessor: 'ecount',
				width: '3%',
				Cell,
			},
			{
				header: 'Users',
				accessor: 'users',
				width: '3%',
				Cell,
			},
			// {
			// 	header: 'Full Payment',
			// 	accessor: 'totalBalance',
			// 	width: '3%',
			// 	Cell: ({ value, ...props }) => (
			// 		<Cell value={value ? `$${value}` : null} {...props} />
			// 	),
			// },
			// {
			// 	header: 'Created At',
			// 	accessor: 'createdAt',
			// 	width: '5%',
			// 	Cell: (props) => (
			// 		<Cell
			// 			{...props}
			// 			value={
			// 				props.value &&
			// 				moment(props.value).format('HH:mm, yy-MM-DD')
			// 			}
			// 		/>
			// 	),
			// },
			{
				header: 'Actions',
				accessor: 'actions',
				width: '1%',
				Cell: ActionCell,
			},
			{
				header: 'Customers',
				accessor: 'customers',
				width: '1%',
				Cell: ({ row }) =>
					isLoading ? null : (
						<Link
							to={`/applications/planners/planner=${row.original._id}`}
							style={{
								textDecoration: 'none',
							}}
						>
							<Button
								className={actionDefaultStyle}
								rightIcon={'ArrowRight'}
							>
								Events
							</Button>
						</Link>
					),
			},
		];
	}, [isLoading]);
};

export default useAdminColumns;
