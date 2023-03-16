import React, { useState } from "react";


import Table from "../../../components/Table";
import Sidebar from "../../../components/Sidebar";
import useFetch from "../../../hooks/utils/useFetch";
import usePreRegister from "../../../hooks/queries/usePreRegister";
import usePreRegisterColumns from "../../../hooks/columns/usePreRegisterColumns";
import cls from "../../applications/customer/style.module.scss";
import { useFreeCourseQuery } from "../../../hooks/queries/useCourseQuery";
import AgentForm from "../../../components/Forms/AgentForm";
import useCourseColumns from "../../../hooks/columns/useCourseColumns";

export default function FreeCourse({ path }) {
  const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const { data, isLoading, isFetching } = useFetch({
    path,
    useQuery: useFreeCourseQuery,
  });
  const columns = useCourseColumns({
    actions: [
			{
				title: 'Info',
				handler: openSidebar(setEditSidebarOpen),
				style: {
					container: `${cls.action_info}`,
				},
			}
		],  
    isLoading
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
      <h1 className={"pageTitle"}>Courses</h1>

      <Table
        data={data?.result || []}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        total={data?.result?.length}
        addActionEnabled={true}
        addAction={openSidebar(setCreateSidebarOpen)}
      />

    <Sidebar
				title="Create Course"
				open={createSidebarOpen}
				close={closeSidebar(setCreateSidebarOpen)}
			>
				<AgentForm  />
			</Sidebar>

    <Sidebar
    title="Edit Company"/>
    </>
  );
}
