import { Route, Routes, Navigate } from 'react-router-dom';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Projects from '../pages/projects';
import ProjectInvestments from '../pages/projects/investments';
import Customer from '../pages/applications/customer';
import Agents from '../pages/applications/Planners';
import Admins from '../pages/applications/admins';
import Deposits from '../pages/accounts/deposits';
import Investments from '../pages/accounts/investments';
import Withdraws from '../pages/accounts/withdraws';
import CancelInvests from '../pages/accounts/cancel-invests';

import Protect from './protect';
import Register from "../pages/registers";
import Courses from '../pages/content/courses';
import FreeCourse from '../pages/content/freeCourse';
import Introduction from '../pages/content/intro';
import Planners from '../pages/applications/Planners';
import ByPlanner from '../pages/applications/Planners/ByPlanner';
import Blog from '../pages/content/blog';
import Recipe from '../pages/content/recipe';
import Category from '../pages/content/category';

const routes = [
	{
		path: '/login',
		content: Login,
	},
	{
		path: '/dashboard',
		content: Dashboard,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/account/deposits',
		content: Deposits,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/account/withdraws',
		content: Withdraws,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/account/investments',
		content: Investments,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/account/cancel-invests',
		content: CancelInvests,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications',
		content: Planners,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications/planners',
		content: Planners,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications/planners/:id',
		content: ByPlanner,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications/customers',
		content: Customer,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications/agents',
		content: Planners,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/applications/admins',
		content: Admins,
		protect: true,
		allowTo: ['superadmin'],
	},
	{
		path: '/projects',
		content: Projects,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/registers',
		content: Register,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	
	{
		path: '/projects/:id/investments',
		content: ProjectInvestments,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/content',
		content: Blog,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/content/blog',
		content: Blog,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/content/recipe',
		content: Recipe,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/content/category',
		content: Category,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	{
		path: '/content/course',
		content: Courses,
		protect: true,
		allowTo: ['superadmin', 'admin'],
	},
	// {
	// 	path: '/content/freecourse',
	// 	content: FreeCourse,
	// 	protect: true,
	// 	allowTo: ['superadmin', 'admin'],
	// },
	// {
	// 	path: '/content/intro',
	// 	content: Introduction,
	// 	protect: true,
	// 	allowTo: ['superadmin', 'admin'],
	// },
	{
		path: '/*',
		content: () => <Navigate to="login" />,
	},
];

function Navigation() {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					element={
						<Protect
							protect={route.protect}
							allowTo={route.allowTo}
							path={route.path}
						>
							{route.content({ path: route.path })}
						</Protect>
					}
					exact
				/>
			))}
		</Routes>
	);
}

export default Navigation;
