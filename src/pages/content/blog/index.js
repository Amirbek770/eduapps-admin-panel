import React, { useState } from "react";


import Table from "../../../components/Table";
import Sidebar from "../../../components/Sidebar";
import useFetch from "../../../hooks/utils/useFetch";
import usePreRegister from "../../../hooks/queries/usePreRegister";
import usePreRegisterColumns from "../../../hooks/columns/usePreRegisterColumns";
import cls from "../../applications/customer/style.module.scss";
import { useCourseQuery } from "../../../hooks/queries/useCourseQuery";
import AgentForm from "../../../components/Forms/AgentForm";
import useBlogColumns from "../../../hooks/columns/useBlogColumns";
import CourseForm from "../../../components/Forms/CourseForm";

export default function Blog({ path }) {
  const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const { data, isLoading, isFetching } = useFetch({
    path,
    useQuery: useCourseQuery,
  });
  const columns = useBlogColumns({
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
      <h1 className={"pageTitle"}>Blog</h1>

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
				<CourseForm  />
			</Sidebar>

    <Sidebar
      title="Edit Course" 
      open={editSidebarOpen}
      close={closeSidebar(setEditSidebarOpen)}
    >
      <CourseForm  />
    </Sidebar>

    </>
  );
}
