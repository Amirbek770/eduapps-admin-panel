import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Table from "../../components/Table";
import Sidebar from "../../components/Sidebar";
import CompanyForm from "../../components/Forms/CompanyForm";

import useCompanyQuery from "../../hooks/queries/useCompanyQuery";
import useCompanyColumns from "../../hooks/columns/useCompanyColumns";
import useCreateCompanyMutation from "../../hooks/mutations/useCreateCompanyMutation";
import useEditCompanyMutation from "../../hooks/mutations/useEditCompanyMutation";

import useFetch from "../../hooks/utils/useFetch";

import cls from "./style.module.scss";

function Projects({ path }) {
  const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);

  const [activeElement, setActiveElement] = useState(null);

  const { data, isLoading, error, isFetching } = useFetch({
    path,
    useQuery: useCompanyQuery,
  });

  const { mutateAsync: createCompanyMutation } = useCreateCompanyMutation();
  const { mutateAsync: editCompanyMutation } = useEditCompanyMutation();

  const columns = useCompanyColumns({
    actions: [
      {
        icon: "Edit",
        handler: openSidebar(setEditSidebarOpen),
        style: {
          container: `${cls.action} ${cls.actionEdit}`,
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

  const addCompany = (body) => {
    body.image = body.image?._id ?? null;

    toast
      .promise(createCompanyMutation(body), {
        loading: "Proccessing...",
        success: "Success!",
        error: (error) => error?.response?.data?.message,
      })
      .then(() => {
        closeSidebar(setCreateSidebarOpen)();
      })
      .catch(console.log);
  };

  const editCompany = (body) => {
    body.image = body.image?._id ?? null;

    toast
      .promise(
        editCompanyMutation({
          id: activeElement?._id,
          body,
        }),
        {
          loading: "Proccessing...",
          success: "Success!",
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
      <h1 className={"pageTitle"}>Projects</h1>

      <Table
        data={data?.result || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        addAction={openSidebar(setCreateSidebarOpen)}
        total={data?.total}
      />

      <Sidebar
        title="Create Project"
        open={createSidebarOpen}
        close={closeSidebar(setCreateSidebarOpen)}
      >
        <CompanyForm submit={addCompany} />
      </Sidebar>

      <Sidebar
        title="Edit Project"
        open={editSidebarOpen}
        close={closeSidebar(setEditSidebarOpen)}
      >
        {activeElement && (
          <CompanyForm
            data={activeElement}
            submit={editCompany}
            submitText="Save"
            mode="edit"
          />
        )}
      </Sidebar>
    </>
  );
}

export default Projects;
