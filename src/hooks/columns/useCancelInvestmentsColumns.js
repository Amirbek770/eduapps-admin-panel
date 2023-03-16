import { useMemo } from "react";
import moment from "moment";
import cookies from "js-cookie";

import Button from "../../components/Button";
import HighlightedText from "../../components/HighlightedText";
import TextSkeleton from "../../components/TextSkeleton";
import Badge from "../../components/Badge";

const useCancelInvestmentsColumns = ({ actions, info, isLoading }) => {
  const currentLanguageCode = cookies.get("i18next") || "en";

  return useMemo(() => {
    const Cell = isLoading ? TextSkeleton : HighlightedText;
    const ActionCell = ({ row }) =>
      isLoading ? null : (
        <div style={{ display: "flex", gap: 5 }}>
          {actions?.map((action, index) => (
            <Button
              key={index}
              icon={action.icon}
              className={action?.style?.container}
              iconClassName={action?.style?.icon}
              onClick={() => action.handler(row?.original)}
              iconSet="bold"
            >
              {action?.name}
            </Button>
          ))}
        </div>
      );

    const InfoActionCell = ({ row }) =>
      isLoading ? null : (
        <Button
          className={info?.style?.container}
          onClick={() => info.handler(row?.original)}
          iconSet="bold"
        >
          {info?.name}
        </Button>
      );

    const statusTypes = {
      pending: {
        label: "Pending",
      },
      accepted: {
        label: "Accepted",
        type: "success",
      },
      rejected: {
        label: "Rejected",
        type: "error",
      },
    };

    return [
      {
        header: "No",
        width: "1%",
        accessor: "index",
        Cell: ({ row: { index } }) =>
          isLoading ? null : <Cell value={index + 1} />,
      },
      {
        header: "Full Name",
        width: "1%",
        accessor: "user.fullName",
        Cell,
      },
      {
        header: "Company",
        accessor: "company.name",
        width: "3%",
        Cell: ({ value }) => (
          <Cell value={value ? `${value?.[currentLanguageCode]}` : ""} />
        ),
      },
      {
        header: "Amount",
        width: "1%",
        accessor: "amount",
        Cell: ({ value, ...props }) => (
          <Cell value={value ? `$${value}` : null} {...props} />
        ),
      },
      {
        header: "Status",
        accessor: "state",
        width: "1%",
        Cell: ({ value }) =>
          isLoading ? null : (
            <Badge
              label={statusTypes?.[value]?.label}
              type={statusTypes?.[value]?.type}
            />
          ),
      },
      {
        header: "Investment date",
        accessor: "investment.createdAt",
        width: "3%",
        Cell: (props) => (
          <Cell
            {...props}
            value={props.value && moment(props.value).format("HH:mm, yy-MM-DD")}
          />
        ),
      },
      {
        header: "Cancel date",
        accessor: "createdAt",
        width: "3%",
        Cell: (props) => (
          <Cell
            {...props}
            value={props.value && moment(props.value).format("HH:mm, yy-MM-DD")}
          />
        ),
      },
      {
        header: "Referal",
        width: "1%",
        accessor: "user.agent.code",
        Cell,
      },
      {
        header: "Actions",
        accessor: "actions",
        width: "1%",
        Cell: ({ row }) =>
          row.original?.state == "pending" ? (
            <ActionCell row={row} />
          ) : (
            <InfoActionCell row={row} />
          ),
      },
    ];
  }, [isLoading]);
};

export default useCancelInvestmentsColumns;
