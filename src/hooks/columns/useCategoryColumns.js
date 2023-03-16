import { useMemo } from 'react';

import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';
import Avatar from '../../components/Avatar';

const useCategoryColumns = ({ actions, isLoading, actionDefaultStyle }) => {
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
				header: 'Title',
				accessor: 'title',
				width: '1%',
				Cell,
			},
			// {
			// 	header: 'Category',
			// 	accessor: 'category',
			// 	width: '1%',
			// 	Cell,
			// },
			{
				header: 'ProjectID',
				accessor: `project_id`,
				width: '1%',
				Cell: ({value, ...props}) => (
					<Cell value={value ? `${value.slice(0, 100)}` : null} {...props} />
				),
			},
			// {
			// 	header: 'Video',
			// 	accessor: 'video',
			// 	width: '1%',
			// 	Cell: ({value, ...props}) => (
			// 		<Cell value={value ? `${value.slice(15)}` : null} {...props} />
			// 	),
			// },
			{
				header: 'Actions',
				accessor: 'actions',
				width: '1%',
				Cell: ActionCell,
			},
		];
	}, [isLoading]);
};

export default useCategoryColumns;
