import { useMemo } from 'react';

import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';
import Avatar from '../../components/Avatar';

const useCustomerColumns = ({ actions, isLoading, actionDefaultStyle }) => {
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
								className={
									action?.style?.container ??
									actionDefaultStyle
								}
								iconClassName={action?.style?.icon}
								onClick={() => action.handler(row?.original)}
								iconSet="bold"
							>
								{action?.title}
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
			// {
			// 	header: 'Image',
			// 	accessor: 'image',
			// 	width: '1%',
			// 	Cell: ({ value }) =>
			// 		isLoading ? null : <Avatar src={value?.url} />,
			// },
			{
				header: 'Full name',
				accessor: 'name',
				width: '2%',
				Cell,
			},
			{
				header: 'Phone number',
				accessor: 'phone_number',
				width: '2%',
				Cell,
			},
			{
				header: 'Payed',
				accessor: `infoDevice`,
				width: '1%',
				Cell,
			},
			// {
			// 	header: 'Device Info',
			// 	accessor: `infoDevice`,
			// 	width: '2%',
			// 	Cell,
			// },
			// {
			// 	header: 'Balance',
			// 	accessor: `balance`,
			// 	width: '1%',
			// 	Cell: ({ value, ...props }) => (
			// 		<Cell value={value ? `$${value}` : null} {...props} />
			// 	),
			// },
			{
				header: 'Car No',
				accessor: `carNumber`,
				width: '1%',
				Cell,
			},
			{
				header: 'Comment',
				accessor: `comment`,
				width: '1%',
				Cell,
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

export default useCustomerColumns;
