const useDrawerData = ({ role }) => {
	return [
		{
			icon: 'Home',
			title: `Dashboard`,
			path: '/dashboard',
		},
		{
			icon: 'Category',
			title: 'Applications',
			path: '/applications',
			children: [
				// {
				// 	title: 'Event planners',
				// 	path: '/applications/planners',
				// 	titleTab: true,
				// },
				{
					title: 'Customers',
					path: '/applications/customers',
					titleTab: true,
				},
				// {
				// 	title: 'Agents',
				// 	path: '/applications/agents',
				// 	titleTab: true,
				// },
				{
					title: 'Admins',
					path: '/applications/admins',
					titleTab: true,
					disabled: role !== 'superadmin',
				},
			],
		},
		{
			icon: 'Work',
			title: 'Content',
			path: '/content',
			children: [
				{
					title: 'Recipe',
					path: '/content/recipe',
					titleTab: true,
				},
				{
					title: 'Category',
					path: '/content/category',
					titleTab: true,
				},
				{
					title: 'Blog',
					path: '/content/blog',
					titleTab: true,
				},
				{
					title: 'Course',
					path: '/content/course',
					titleTab: true,
				},
				
				// {
				// 	title: 'Introduction',
				// 	path: '/content/intro',
				// 	titleTab: true,
				// 	disabled: role !== 'superadmin',
				// },
				// {
				// 	title: 'Admins',
				// 	path: '/content/admins',
				// 	titleTab: true,
				// 	disabled: role !== 'superadmin',
				// },
			]
		},
		{
			icon: 'People',
			title: 'Account',
			path: '/account',
			children: [
				{
					title: 'Deposit',
					path: '/account/deposits',
					titleTab: true,
					countField: 'topups',
				},
				{
					title: ' Withdrawal',
					path: '/account/withdraws',
					titleTab: true,
					countField: 'withdraws',
				},
				{
					title: ' Investment',
					path: '/account/investments',
					titleTab: true,
					countField: 'invests',
				},
				{
					title: ' Cancel Invest',
					path: '/account/cancel-invests',
					titleTab: true,
					countField: 'returns',
				},
			],
		},
		{
			icon: 'Work',
			title: 'Projects',
			path: '/projects',
		},
		{
			icon: 'People',
			title: `Registers`,
			path: '/registers',
		},
	];
};

export default useDrawerData;
