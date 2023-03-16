import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Sidebar from '../../../components/Sidebar';
import Table from '../../../components/Table';

import {useCustomersQuery} from '../../../hooks/queries/useCustomerQuery';
import useCustomerColumns from '../../../hooks/columns/useCustomerColumns';
import useEditCustomerMutation from '../../../hooks/mutations/useEditCustomerMutation';
import useFetch from '../../../hooks/utils/useFetch';

import CustomerInfo from './info';
import cls from './style.module.scss';

function Customers({ path }) {
	const [editSidebarOpen, setEditSidebarOpen] = useState(false);

	const [activeElement, setActiveElement] = useState(null);
	const { data, isLoading, error, isFetching } = useFetch({
		path,
		useQuery: useCustomersQuery,
	});
	console.log('path customers', path);

	const { mutateAsync: editCustomerMutation } = useEditCustomerMutation();

	const columns = useCustomerColumns({
		actions: [
			{
				title: 'Info',
				handler: openSidebar(setEditSidebarOpen),
				style: {
					container: `${cls.action_info}`,
				},
			},
			// {
			// 	title: 'Payed',
			// 	handler: openSidebar(setEditSidebarOpen),
			// 	style: {
			// 		container: `${cls.action_edit}`,
			// 	},
			// },
		],
		isLoading,
	});

	function openSidebar(setOpen) {
		return (data) => {
			setOpen(true);
			if (data) setActiveElement(data);
		};
	}

	function closeSidebar(setOpen) {
		return () => {
			setOpen(false);
			setActiveElement(null);
		};
	}

	const editCustomer = (body) => {
		toast
			.promise(
				editCustomerMutation({
					id: activeElement?._id,
					body,
				}),
				{
					loading: 'Proccessing...',
					success: 'Success!',
					error: (error) => error?.response?.data?.message,
				}
			)
			.then(() => {
				closeSidebar(setEditSidebarOpen)();
			})
			.catch(console.log);
	};

	return (
		<>
			<h1 className={'pageTitle'}>Customers</h1>
			<Table
				data={data?.result || []}
				columns={columns}
				isLoading={isLoading}
				isFetching={isFetching}
				total={data?.total}
				addActionEnabled={false}
			/>

			<Sidebar
				title="Customers Info "
				open={editSidebarOpen}
				close={closeSidebar(setEditSidebarOpen)}
			>
				{activeElement && (
					<CustomerInfo data={activeElement} submit={editCustomer} />
				)}
			</Sidebar>
		</>
	);
}

export default Customers;
