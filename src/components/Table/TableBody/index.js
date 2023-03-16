import cls from './style.module.scss';

export default function TableBody({
	rows,
	getTableProps,
	headerGroups,
	handleSort,
	getTableBodyProps,
	prepareRow,
	searchTerm,
}) {
	return (
		<table className={cls.table} {...getTableProps()}>
			<thead className={cls.head}>
				{headerGroups?.map((headerGroup, index) => (
					<tr
						className={cls.row}
						key={index}
						{...headerGroup?.getHeaderGroupProps()}
					>
						{headerGroup?.headers?.map((column, index) => (
							<th
								key={index}
								{...column?.getHeaderProps(
									column?.getSortByToggleProps()
								)}
								width={column?.width}
								className={handleSort}
							>
								{column.header}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()} className={cls.body}>
				{rows?.map((row,index) => {
					prepareRow(row);

					return (
						<tr
							key={index}
							className={cls.row}
							{...row?.getRowProps()}
						>
							{row?.cells?.map((cell,index) => (
								<td
									key={index}
									className={cls.data}
									{...cell?.getCellProps()}
								>
									{cell?.render('Cell', {
										selection: searchTerm,
									})}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
