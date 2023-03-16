import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import Table from '../../../components/Table';
import Sidebar from '../../../components/Sidebar';
import Delete from '../../../components/Delete';
import DepositAcceptForm from '../../../components/Forms/DepositAcceptForm';
import TransactionInfo from '../../../components/TransactionInfo';

import useTransactionsQuery from '../../../hooks/queries/useTransactionsQuery';
import useInvestmentsColumns from '../../../hooks/columns/useInvestmentsColumns';

import useTransactionAcceptMutation from '../../../hooks/mutations/useTransactionAcceptMutation';
import useTransactionRejectMutation from '../../../hooks/mutations/useTransactionRejectMutation';

import useFetch from '../../../hooks/utils/useFetch';

import cls from './style.module.scss';

function Investments({ path }) {
	const [acceptSidebar, setAcceptSidebar] = useState(false);
	const [rejectSidebar, setRejectSidebar] = useState(false);
	const [infoSidebar, setInfoSidebar] = useState(false);
	const [activeElement, setActiveElement] = useState(null);

	const { mutateAsync: acceptMutation } = useTransactionAcceptMutation();
	const { mutateAsync: rejectMutation } = useTransactionRejectMutation();

	const { data, isLoading, isFetching } = useFetch({
		path,
		useQuery: useTransactionsQuery,
		params: {
			type: 'invest',
			active: true,
		},
	});

	const columns = useInvestmentsColumns({
		actions: [
			{
				icon: 'TickSquare',
				handler: openSidebar(setAcceptSidebar),
				style: {
					container: `${cls.action} ${cls.actionEdit}`,
					icon: cls.actionIcon,
				},
			},
			{
				icon: 'CloseSquare',
				handler: openSidebar(setRejectSidebar),
				style: {
					container: `${cls.action} ${cls.actionDelete}`,
					icon: cls.actionIcon,
				},
			},
		],
		info: {
			name: 'Info',
			handler: openSidebar(setInfoSidebar),
			style: {
				container: `${cls.action} ${cls.actionInfo}`,
			},
		},
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

	const accept = (body) => {
		toast
			.promise(
				acceptMutation({
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
				closeSidebar(setAcceptSidebar)();
			})
			.catch(console.log);
	};

	const reject = () => {
		toast
			.promise(
				rejectMutation({
					id: activeElement?._id,
				}),
				{
					loading: 'Proccessing...',
					success: 'Success!',
					error: (error) => error?.response?.data?.message,
				}
			)
			.then(() => {
				closeSidebar(setRejectSidebar)();
			})
			.catch(console.log);
	};

	return (
		<>
			<h1 className={'pageTitle'}>Investments</h1>

			<Table
				data={data?.data || []}
				columns={columns}
				isLoading={isLoading}
				isFetching={isFetching}
				total={data?.total}
				addActionEnabled={false}
			/>

			<Sidebar
				title="Accept"
				open={acceptSidebar}
				close={closeSidebar(setAcceptSidebar)}
			>
				{activeElement && (
					<DepositAcceptForm
						info={activeElement}
						data={activeElement}
						submit={accept}
					/>
				)}
			</Sidebar>

			<Sidebar
				title="Reject"
				open={rejectSidebar}
				close={closeSidebar(setRejectSidebar)}
			>
				{activeElement && (
					<Delete
						onDelete={reject}
						onCancel={closeSidebar(setRejectSidebar)}
						text={'Do you want to reject this deposit?'}
					/>
				)}
			</Sidebar>

			<Sidebar
				title="Info"
				open={infoSidebar}
				close={closeSidebar(setInfoSidebar)}
			>
				{activeElement && <TransactionInfo data={activeElement} />}
			</Sidebar>
		</>
	);
}

export default Investments;
