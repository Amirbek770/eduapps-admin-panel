import React, { useState } from 'react';
import { useMatch, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-iconly';

import Table from '../../../components/Table';
import Sidebar from '../../../components/Sidebar';

import useCompanyInvestmentsQuery from '../../../hooks/queries/useCompanyInvestmentsQuery';
import useCompanyInvestmentsColumns from '../../../hooks/columns/useCompanyInvestmentsColumns';

import useFetch from '../../../hooks/utils/useFetch';

import InvestmentInfo from './info';
import cls from './style.module.scss';

function ProjectInvestments({ path }) {
	const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
	const [activeElement, setActiveElement] = useState(null);

	const navigate = useNavigate(path);

	const match = useMatch(path);

	const { data, isLoading, error, isFetching } = useFetch({
		path,
		useQuery: useCompanyInvestmentsQuery,
		id: match?.params?.id,
	});

	const columns = useCompanyInvestmentsColumns({
		actions: [
			{
				name: 'Info',
				handler: openSidebar(setCreateSidebarOpen),
				style: {
					container: cls.actionDefaultStyle,
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

	return (
		<>
			<h1 className={'pageTitle'}>
				<Link to="/projects" passHref>
					<ArrowLeft size={28} />
					Projects
				</Link>
				<span>
					{data?.data?.[0]?.company?.name
						? ` / ${data?.data?.[0]?.company?.name}`
						: ''}
				</span>
			</h1>

			<Table
				data={data?.data || []}
				columns={columns}
				isLoading={isLoading}
				isFetching={isFetching}
				total={data?.total}
				addActionEnabled={false}
			/>

			<Sidebar
				title="Customer Info"
				open={createSidebarOpen}
				close={closeSidebar(setCreateSidebarOpen)}
			>
				{activeElement && <InvestmentInfo data={activeElement} />}
			</Sidebar>
		</>
	);
}

export default ProjectInvestments;
