import React, { useMemo } from 'react';
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from 'react-table';

import NoData from '../NoData';

import Head from './Head';
import TableBody from './TableBody';
import Pagination from './Pagination';

import cls from './style.module.scss';

const Table = ({
	data,
	columns,
	searchPlaceholder,
	addAction,
	addActionEnabled,
	isLoading,
	isFetching,
	total,
}) => {
	const placeholderData = useMemo(() => {
		return new Array(5).fill({});
	}, []);

	const {
		page,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		setGlobalFilter,
		gotoPage,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data: isLoading ? placeholderData : data,
			initialState: {
				pageIndex: 0,
				// sortBy: [{ id: 'createdAt', desc: true }],
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<div className={cls.container}>
			<Head
				setGlobalFilter={setGlobalFilter}
				searchPlaceholder={searchPlaceholder}
				addAction={addAction}
				addActionEnabled={addActionEnabled}
				isFetching={isFetching}
			/>
			{isLoading || (data && data.length) ? (
				<TableBody
					rows={page}
					prepareRow={prepareRow}
					headerGroups={headerGroups}
					getTableProps={getTableProps}
					getTableBodyProps={getTableBodyProps}
					searchTerm={globalFilter}
				/>
			) : (
				<NoData text={'No thing to show'} />
			)}
			{isLoading || !(data && data.length) || pageSize >= total ? null : (
				<Pagination
					pages={Math.ceil(total / pageSize)}
					page={pageIndex}
					onPageChange={gotoPage}
				/>
			)}
		</div>
	);
};

export default Table;
