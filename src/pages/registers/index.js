import React from "react";


import Table from "../../components/Table";
import Sidebar from "../../components/Sidebar";
import useFetch from "../../hooks/utils/useFetch";
import usePreRegister from "../../hooks/queries/usePreRegister";
import usePreRegisterColumns from "../../hooks/columns/usePreRegisterColumns";
import cls from "../applications/customer/style.module.scss";

export default function Register({ path }) {
  const { data, isLoading, isFetching } = useFetch({
    path,
    useQuery: usePreRegister,
  });
  const columns = usePreRegisterColumns({isLoading});

  return (
    <>
      <h1 className={"pageTitle"}>Registers</h1>

      <Table
        data={data?.data || []}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
        total={data?.total}
        addActionEnabled={false}

      />

    {/*  <Sidebar*/}
    {/*title="Create Company"*/}

    {/*/>*/}

    {/*  <Sidebar*/}
    {/*title="Edit Company"*/}
    {/*/>*/}
    </>
  );
}
