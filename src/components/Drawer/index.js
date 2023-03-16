import React from 'react';
import { useLocation, matchPath } from 'react-router';

import List from '../List';
import useDrawerData from './data';
import useProfileQuery from '../../hooks/queries/useProfileQuery';
import usePendingTransactionsCountQuery from '../../hooks/queries/usePendingTransactionsCountQuery';

import cls from './style.module.scss';

function Drawer() {
	const { pathname } = useLocation();
	// const { data: profile } = useProfileQuery();
	const  profile = useProfileQuery();
	const data = useDrawerData({ role: profile?.role });
	const { data: counts } = usePendingTransactionsCountQuery();

	return (
		<div className={cls.container}>
			<div className={cls.logo}>
				<img src="/images/logo.png" alt="" />
			</div>

			{data.map((item, index) => {
				const active = `${pathname}`.includes(item.path);

				if (item.disabled) return null;

				return item.children ? (
					<List.Accordion
						{...item}
						initialOpen={active}
						active={active}
						path={item.children?.[0].path}
						key={item.path}
					>
						{item.children.map?.((childItem, index) => {
							if (childItem.disabled) return null;

							return (
								<List.Item
									{...childItem}
									active={pathname === childItem.path}
									inner
									key={index}
									count={counts?.[childItem.countField]}
								/>
							);
						})}
					</List.Accordion>
				) : (
					<List.Item key={item.path} {...item} active={active} />
				);
			})}
		</div>
	);
}

export default Drawer;
