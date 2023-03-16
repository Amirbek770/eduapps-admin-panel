import React, { useMemo } from 'react';
import { useLocation } from 'react-router';

import Navbar from '../Navbar';
import Drawer from '../Drawer';

import cls from './style.module.scss';

const routesWithoutLayout = ['/login', '/'];

function Layout({ children }) {
	const { pathname } = useLocation();

	const disabled = useMemo(() => {
		return routesWithoutLayout.includes(pathname);
	}, [pathname]);

	console.log('Layout path', pathname);
	console.log('Layout disabled', disabled);

	return !disabled ? (
		<div className={cls.container}>
			<Drawer />
			<div className={cls.right}>
				<Navbar />
				<div className={cls.content}>{children}</div>
			</div>
		</div>
	) : (
		children
	);
}

export default Layout;
