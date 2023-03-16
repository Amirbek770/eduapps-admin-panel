import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Table from '../../../components/Table';
import Sidebar from '../../../components/Sidebar';
import AdminForm from '../../../components/Forms/AdminForm';
import Delete from '../../../components/Delete';

import useAdminColumns from '../../../hooks/columns/useAdminColumns';
import useAdminsQuery from '../../../hooks/queries/useAdminsQuery';
import useCreateAdminMutation from '../../../hooks/mutations/useCreateAdminMutation';
import useEditAdminMutation from '../../../hooks/mutations/useEditAdminMutation';
import useDeleteAdminMutation from '../../../hooks/mutations/useDeleteAdminMutation';

import useFetch from '../../../hooks/utils/useFetch';

import cls from './style.module.scss';

function Admins({ path }) {
	const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
	const [editSidebarOpen, setEditSidebarOpen] = useState(false);
	const [deleteSidebarOpen, setDeleteSidebarOpen] = useState(false);

	const [activeElement, setActiveElement] = useState(null);

	const { data, isLoading, error, isFetching } = useFetch({
		path,
		useQuery: useAdminsQuery,
		params: {
			role: 'admin',
		},
	});

	const { mutateAsync: createAdminMutation } = useCreateAdminMutation();
	const { mutateAsync: editAdminMutation } = useEditAdminMutation();
	const { mutateAsync: deleteAdminMutation } = useDeleteAdminMutation();

	const columns = useAdminColumns({
		actions: [
			{
				icon: 'Edit',
				handler: openSidebar(setEditSidebarOpen),
				style: {
					container: `${cls.action} ${cls.actionEdit}`,
					icon: cls.actionIcon,
				},
			},
			{
				icon: 'Delete',
				handler: openSidebar(setDeleteSidebarOpen),
				style: {
					container: `${cls.action} ${cls.actionDelete}`,
					icon: cls.actionIcon,
				},
			},
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

	const addAdmin = (body) => {
		toast
			.promise(createAdminMutation(body), {
				loading: 'Proccessing...',
				success: 'Success!',
				error: (error) => error?.response?.data?.message,
			})
			.then(() => {
				closeSidebar(setCreateSidebarOpen)();
			})
			.catch(console.log);
	};

	const editAdmin = (body) => {
		toast
			.promise(
				editAdminMutation({
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

	const deleteAdmin = () => {
		toast
			.promise(
				deleteAdminMutation({
					id: activeElement?._id,
				}),
				{
					loading: 'Proccessing...',
					success: 'Success!',
					error: (error) => error?.response?.data?.message,
				}
			)
			.then(() => {
				closeSidebar(setDeleteSidebarOpen)();
			})
			.catch(console.log);
	};

	return (
		<>
			<h1 className={'pageTitle'}>Admins</h1>

			<Table
				data={data?.data || []}
				columns={columns}
				isLoading={isLoading}
				isFetching={isFetching}
				addAction={openSidebar(setCreateSidebarOpen)}
				total={data?.total}
			/>

			<Sidebar
				title="Create Admin"
				open={createSidebarOpen}
				close={closeSidebar(setCreateSidebarOpen)}
			>
				<AdminForm submit={addAdmin} />
			</Sidebar>

			<Sidebar
				title="Edit admin"
				open={editSidebarOpen}
				close={closeSidebar(setEditSidebarOpen)}
			>
				{activeElement && (
					<AdminForm
						data={activeElement}
						submit={editAdmin}
						submitText="Save"
						mode="edit"
					/>
				)}
			</Sidebar>

			<Sidebar
				title="Delete admin"
				open={deleteSidebarOpen}
				close={closeSidebar(setDeleteSidebarOpen)}
			>
				{activeElement && (
					<Delete
						onDelete={deleteAdmin}
						onCancel={closeSidebar(setDeleteSidebarOpen)}
						text={'Do you want to delete this admin?'}
					/>
				)}
			</Sidebar>
		</>
	);
}

export default Admins;
