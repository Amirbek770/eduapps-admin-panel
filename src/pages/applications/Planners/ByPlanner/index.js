import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import Table from '../../../../components/Table';
import Sidebar from '../../../../components/Sidebar';
import Delete from '../../../../components/Delete';

import useByPlannerColumns from '../../../../hooks/columns/useByPlannerColumns';
import useEditAgentMutation from '../../../../hooks/mutations/useEditAgentMutation';
import useDeleteAgentMutation from '../../../../hooks/mutations/useDeleteAgentMutation';
import useCreateAgentMutation from '../../../../hooks/mutations/useCreateAgentMutation';
import useFetch from '../../../../hooks/utils/useFetch';

import cls from './style.module.scss';
import PlannerForm from '../../../../components/Forms/AgentForm';
import {useCustomersQuery} from '../../../../hooks/queries/useCustomerQuery';
import ByPlannerForm from '../../../../components/Forms/ByPlannerForm';

function ByPlanner({ path }) {
	const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
	const [editSidebarOpen, setEditSidebarOpen] = useState(false);
	const [deleteSidebarOpen, setDeleteSidebarOpen] = useState(false);

	const [activeElement, setActiveElement] = useState(null);

	const { data, isLoading, error, isFetching } = useFetch({
		path,
		useQuery: useCustomersQuery,
	});

	console.log('data planner ByPlanner', data);

	const { mutateAsync: createAgentMutation } = useCreateAgentMutation();
	const { mutateAsync: editAgentMutation } = useEditAgentMutation();
	const { mutateAsync: deleteAgentMutation } = useDeleteAgentMutation();

	const columns = useByPlannerColumns({
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
		actionDefaultStyle: cls.actionDefaultStyle,
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

	const addAgent = (body) => {
		toast
			.promise(createAgentMutation(body), {
				loading: 'Proccessing...',
				success: 'Success!',
				error: (error) => error?.response?.data?.message,
			})
			.then(() => {
				closeSidebar(setCreateSidebarOpen)();
			})
			.catch(console.log);
	};

	const editAgent = (body) => {
		toast
			.promise(
				editAgentMutation({
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

	const deleteAgent = () => {
		toast
			.promise(
				deleteAgentMutation({
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
			<h1 className={'pageTitle'}>Planner Impact.t</h1>
			<Table
				data={data?.result || []}
				columns={columns}
				isLoading={isLoading}
				isFetching={isFetching}
				addAction={openSidebar(setCreateSidebarOpen)}
				total={data?.total}
			/>
			<Sidebar
				title="Create event"
				open={createSidebarOpen}
				close={closeSidebar(setCreateSidebarOpen)}
			>
				<ByPlannerForm submit={addAgent} />
			</Sidebar>
			<Sidebar
				title="Edit event"
				open={editSidebarOpen}
				close={closeSidebar(setEditSidebarOpen)}
			>
				{activeElement && (
					<ByPlannerForm
						data={activeElement}
						submit={editAgent}
						submitText="Save"
						mode="edit"
					/>
				)}
			</Sidebar>

			<Sidebar
				title="Delete agent"
				open={deleteSidebarOpen}
				close={closeSidebar(setDeleteSidebarOpen)}
			>
				{activeElement && (
					<Delete
						onDelete={deleteAgent}
						onCancel={closeSidebar(setDeleteSidebarOpen)}
						text={'Do you want to delete this agent?'}
					/>
				)}
			</Sidebar>
		</>
	);
}

export default ByPlanner;
