import { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import cookies from "js-cookie";

import Button from "../../components/Button";
import HighlightedText from "../../components/HighlightedText";
import TextSkeleton from "../../components/TextSkeleton";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";

const useCompanyColumns = ({ actions, isLoading, actionDefaultStyle }) => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  return useMemo(() => {
    const Cell = isLoading ? TextSkeleton : HighlightedText;

    const ActionCell = isLoading
      ? () => null
      : ({ row }) => (
          <div style={{ display: "flex", gap: 5 }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                icon={action.icon}
                className={action?.style?.container ?? actionDefaultStyle}
                iconClassName={action?.style?.icon}
                onClick={() => action.handler(row?.original)}
                iconSet="bold"
              >
                {action?.name}
              </Button>
            ))}
          </div>
        );

    return [
      {
        header: "No",
        width: "1%",
        accessor: "index",
        Cell: ({ row: { index }, data }) =>
          isLoading ? null : <Cell value={data?.length - index} />,
      },
      {
        header: "ID",
        width: "1%",
        accessor: "_id",
        Cell
      },
      // {
      //   header: "Image",
      //   accessor: "image",
      //   width: "1%",
      //   Cell: ({ value }) => (isLoading ? null : <Avatar src={value?.url} />),
      // },
      {
        header: "Title",
        accessor: "title",
        width: "1%",
        Cell,
      },
      // {
      //   header: "Company name",
      //   accessor: "name",
      //   width: "5%",
      //   Cell: ({ value }) => (
      //     <Cell value={value ? `${value?.[currentLanguageCode]}` : ""} />
      //   ),
      // },
      // {
      //   header: "Type",
      //   accessor: "type",
      //   width: "5%",
      //   Cell,
      // },
      // {
      //   header: "Number of investments",
      //   accessor: "numberOfInvestmens",
      //   width: "5%",
      //   Cell,
      // },
      // {
      //   header: "Balance",
      //   accessor: "balance",
      //   width: "5%",
      //   Cell: ({ value, ...props }) => (
      //     <Cell value={value ? `$${value}` : ""} {...props} />
      //   ),
      // },
      {
        header: "Status",
        accessor: "active",
        width: "1%",
        Cell: ({ value }) =>
          isLoading ? null : (
            <Badge
              label={value ? "Active" : "Inactive"}
              type={value ? "success" : "error"}
            />
          ),
      },
      {
        header: "Actions",
        accessor: "actions",
        width: "1%",
        Cell: ActionCell,
      },
      // {
      //   header: "Customers",
      //   accessor: "customers",
      //   width: "1%",
      //   Cell: ({ row }) =>
      //     isLoading ? null : (
      //       <Link
      //         to={`/projects/${row.original._id}/investments`}
      //         style={{
      //           textDecoration: "none",
      //         }}
      //       >
      //         <Button className={actionDefaultStyle} rightIcon={"ArrowRight"}>
      //           Customers
      //         </Button>
      //       </Link>
      //     ),
      // },
    ];
  }, [isLoading]);
};

export default useCompanyColumns;
