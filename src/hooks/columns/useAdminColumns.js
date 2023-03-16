import { useMemo } from 'react';
import moment from 'moment';

import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';

const useAdminColumns = ({ actions, isLoading }) => {
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
				Cell: ({ row: { index } }) =>
					isLoading ? null : <Cell value={index + 1} />,
			},
			{
				header: 'Name',
				accessor: 'name',
				width: '5%',
				Cell,
			},
			{
				header: 'Login',
				accessor: 'login',
				width: '5%',
				Cell,
			},
			{
				header: 'Created at',
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

export default useAdminColumns;
