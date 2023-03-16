import React, { useState } from 'react';
import cls from './pagination.module.scss';
import Button from '../../Button';

const Pagination = ({ pages, page, onPageChange }) => {
	const [visiblePages, setVisiblePages] = useState(
		getVisiblePages(null, pages)
	);

	function filterPages(visiblePages, totalPages) {
		return visiblePages.filter((page) => page <= totalPages);
	}

	function getVisiblePages(page, total) {
		if (total < 7) {
			return filterPages([1, 2, 3, 4, 5, 6], total);
		} else {
			if (page % 5 >= 0 && page > 4 && page + 2 < total) {
				return [1, page - 1, page, page + 1, total];
			} else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
				return [1, total - 3, total - 2, total - 1, total];
			} else {
				return [1, 2, 3, 4, 5, total];
			}
		}
	}

	function changePage(value) {
		const activePage = page + 1;

		if (value === activePage) return;

		const visiblePages = getVisiblePages(value, pages);

		setVisiblePages(filterPages(visiblePages, pages));

		onPageChange?.(value - 1);
	}

	const prevPage = () => {
		const activePage = page + 1;

		if (activePage === 1) return;

		changePage(activePage - 1);
	};

	const nextPage = () => {
		const activePage = page + 1;

		if (activePage === pages) return;

		changePage(activePage + 1);
	};

	return (
		<div className={cls.container}>
			<Button
				onClick={prevPage}
				className={cls.text}
				iconClassName={cls.icon}
				icon={'ArrowLeftSquare'}
			/>
			<div className={cls.numbers}>
				{visiblePages.map((item, index, array) => {
					if (array[index - 1] + 2 < item) {
						return (
							<>
								<Button
									key={item + 'dots'}
									className={`${cls.number}`}
								>
									...
								</Button>
								<Button
									key={item}
									className={`${cls.number} ${
										page + 1 === item && cls.active
									}`}
									onClick={() => changePage(item)}
								>
									{item}
								</Button>
							</>
						);
					}

					return (
						<Button
							key={item}
							className={`${cls.number} ${
								page + 1 === item && cls.active
							}`}
							onClick={() => changePage(item)}
						>
							{item}
						</Button>
					);
				})}
			</div>

			<Button
				onClick={nextPage}
				className={`${cls.text}`}
				iconClassName={cls.icon}
				icon={'ArrowRightSquare'}
			/>
		</div>
	);
};

export default Pagination;
