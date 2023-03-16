import React from "react";

import DashboardCard from "../../components/DashboardCard";
import ProgressBar from "../../components/ProgressBar";

import useFetch from "../../hooks/utils/useFetch";
import useDailyStatisticsQuery from "../../hooks/queries/useDailyStatisticsQuery";
import useMonthlyStatisticsQuery from "../../hooks/queries/useMonthlyStatisticsQuery";
import useOverallStatisticsQuery from "../../hooks/queries/useOverallStatisticsQuery";

import cls from "./style.module.scss";
import {useCustomersQuery} from "../../hooks/queries/useCustomerQuery";
import { useCourseQuery } from "../../hooks/queries/useCourseQuery";
import { useCategoryQuery } from "../../hooks/queries/useCategoryQuery";
import { useRecipeQuery } from "../../hooks/queries/useRecipeQuery";
import { useProjectQuery } from "../../hooks/queries/useProjectQuery";

function Dashboard({ path }) {
  const { data: dailyStatistics, isFetching: dailyIsFetching } = useFetch({
    path,
    useQuery: useDailyStatisticsQuery,
  });

  const { data: monthlyStatistics, isFetching: monthlyIsFetching } = useFetch({
    path,
    useQuery: useMonthlyStatisticsQuery,
  });

  const { data: overallStatistics, isFetching: overallIsFetching } = useFetch({
    path,
    useQuery: useOverallStatisticsQuery,
  });

  const {
    data: totalUser,
    isLoading,
    error,
    isFetchingUser
  } = useFetch({
    path,
    useQuery: useCustomersQuery,
  });

  const {
    data: totalCategory,
    isLoadingCategory,
    errorCategory,
    isFetchingCategory
  } = useFetch({
    path,
    useQuery: useCategoryQuery,
  });

  const {
    data: totalCourse,
    isLoadingCourse,
    errorCourse,
    isFetchingCourse
  } = useFetch({
    path,
    useQuery: useCourseQuery,
  });

  const {
    data: totalRecipe,
    isLoadingRecipe,
    errorRecipe,
    isFetchingRecipe
  } = useFetch({
    path,
    useQuery: useRecipeQuery,
  });

  const {
    data: totalProject,
    isLoadingProject,
    errorProject,
    isFetchingProject
  } = useFetch({
    path,
    useQuery: useProjectQuery,
  });

  const titles = {
    userAll: "User All",
    recipeAll: "Recipe All",
    categoryAll: "Category All",
    courseAll: "Course All",
    articleAll: "Article All",
    projectAll: "Project All",
    instructorAll: "Instructor"
  };

  return (
    <>
      {(isFetchingUser || isFetchingCategory) && (
        <ProgressBar className={cls.progress} />
      )}

      <h1 className={"pageTitle"}> Dashboard</h1>
      <div className={cls.container}>
        <div className={cls.section}>
          <p className={cls.title}>Overall</p>
          <div className={cls.cardContainer}>
            <DashboardCard
              key={1}
              icon="User"
              title={titles.userAll}
              amount={totalUser?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />
            <DashboardCard
              key={2}
              icon="Unlock"
              title={titles.recipeAll}
              amount={totalRecipe?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />
            <DashboardCard
              key={3}
              icon="Unlock"
              title={titles.categoryAll}
              amount={totalCategory?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />
            <DashboardCard
              key={4}
              icon="Unlock"
              title={titles.courseAll}
              amount={totalCourse?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />
            <DashboardCard
              key={5}
              icon="Unlock"
              title={titles.articleAll}
              amount={totalCourse?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />
            <DashboardCard
              key={6}
              icon="Unlock"
              title={titles.projectAll}
              amount={totalProject?.total}
              percent={overallStatistics?.registered?.difference * 100}
            />

            {overallStatistics?.transactions?.map((item, index) => (
              <DashboardCard
                key={index}
                title={titles[item._id]}
                amount={item.amount}
                percent={item.difference * 100}
                currency="$"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
