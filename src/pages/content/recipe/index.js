import React, { useState } from "react";


import Table from "../../../components/Table";
import Sidebar from "../../../components/Sidebar";
import useFetch from "../../../hooks/utils/useFetch";
import usePreRegister from "../../../hooks/queries/usePreRegister";
import usePreRegisterColumns from "../../../hooks/columns/usePreRegisterColumns";
import cls from "../../applications/customer/style.module.scss";
import { useCourseQuery } from "../../../hooks/queries/useCourseQuery";
import AgentForm from "../../../components/Forms/AgentForm";
import useCourseColumns from "../../../hooks/columns/useCourseColumns";
import CourseForm from "../../../components/Forms/CourseForm";
import { useRecipeQuery } from "../../../hooks/queries/useRecipeQuery";
import useRecipeColumns from "../../../hooks/columns/useRecipeColumns";
import useEditRecipeMutation from "../../../hooks/mutations/useEditRecipeMutation";
import useCreateRecipeMutation from "../../../hooks/mutations/useCreateRecipeMutation";
import toast from "react-hot-toast";
import RecipeForm from "../../../components/Forms/RecipeForm";
import { useProjectQuery } from "../../../hooks/queries/useProjectQuery";
import { useCategoryQuery } from "../../../hooks/queries/useCategoryQuery";

export default function Recipe({ path }) {
  const [createSidebarOpen, setCreateSidebarOpen] = useState(false);
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);

  const { data, isLoading, isFetching } = useFetch({
    path,
    useQuery: useRecipeQuery,
  });

  const { data: dataProject, isLoadingProject, isFetchingProject } = useFetch({
    path,
    useQuery: useProjectQuery,
  });

  const { data: dataCategory, isLoadingCategory, isFetchingCategory } = useFetch({
    path,
    useQuery: useCategoryQuery,
  });

  const { mutateAsync: createRecipeMutation } = useCreateRecipeMutation();
  const { mutateAsync: editRecipeMutation } = useEditRecipeMutation();

  const columns = useRecipeColumns({
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

  const addRecipe = (body) => {
    console.log("addRecipe body", body);
    toast
      .promise(createRecipeMutation(body), {
        loading: "Proccessing...",
        success: "Success!",
        error: (error) => error?.response?.data?.message,
      })
      .then((res) => {
        console.log("addRecipe res", res.data.data);
        closeSidebar(setCreateSidebarOpen)();
      })
      .catch(console.log);
  };

  const editRecipe = (body) => {
		toast
			.promise(
				editRecipeMutation({
					id: activeElement?._id,
					body,
				}),
				{
					loading: 'Proccessing...',
					success: 'Success!',
					error: (error) => error?.response?.data?.message,
				}
			)
			.then((res) => {
        console.log("editRecipe res", res.data);
				closeSidebar(setEditSidebarOpen)();
			})
			.catch(console.log);
	};

  return (
    <>
      <h1 className={"pageTitle"}>Recipe</h1>

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
				title="Create Recipe"
				open={createSidebarOpen}
				close={closeSidebar(setCreateSidebarOpen)}
			>
				<RecipeForm dataCategory={dataCategory} dataProject={dataProject} submit={addRecipe} />
			</Sidebar>

    <Sidebar
      title="Edit Recipe" 
      open={editSidebarOpen}
      close={closeSidebar(setEditSidebarOpen)}
    >
      {activeElement && (
          <RecipeForm
            dataCategory={dataCategory} 
            dataProject={dataProject}
            data={activeElement}
            submit={editRecipe}
            submitText="Save"
            mode="edit"
          />
        )}
      
    </Sidebar>

    </>
  );
}
