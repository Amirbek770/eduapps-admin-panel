import React, { useMemo, useState } from "react";
import { Notification, Iconly } from "react-iconly";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import i18next from "i18next";
import Sidebar from "../Sidebar";
import AdminForm from "../Forms/AdminForm";
import useProfileQuery from "../../hooks/queries/useProfileQuery";
import useUpdateProfileMutation from "../../hooks/mutations/useUpdateProfileMutation";
import usePendingTransactionsCountQuery from "../../hooks/queries/usePendingTransactionsCountQuery";

import cls from "./style.module.scss";

function Navbar() {
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);

  const  data  = useProfileQuery();
  const { data: counts } = usePendingTransactionsCountQuery();
  console.log('Navbar data', data, counts);
  const { mutateAsync } = useUpdateProfileMutation();

  const count = useMemo(() => {
    return Object.values(counts ?? {}).reduce((a, b) => a + b, 0);
  }, [counts]);

  const notificationLink = useMemo(() => {
    const links = {
      topups: "/account/deposits",
      invests: "/account/investments",
      returns: "/account/cancel-invests",
      withdraws: "/account/withdraws",
    };

    const key = Object.keys(counts ?? {}).find((key) => counts?.[key] > 0);

    return links[key];
  }, [counts]);

 console.log('Navbar count', count);

  function closeSidebar(setOpen) {
    return () => {
      setOpen(false);
      setEditSidebarOpen(false);
    };
  }

  function openSidebar(setOpen) {
    return () => {
      setOpen(true);
      setEditSidebarOpen(true);
    };
  }

  const editAdmin = (body) => {
    toast
      .promise(mutateAsync(body), {
        loading: "Proccessing...",
        success: "Success!",
        error: (error) => error?.response?.data?.message,
      })
      .then(() => {
        closeSidebar(setEditSidebarOpen)();
      })
      .catch(console.log);
  };

  return (
    <div className={cls.container}>
      <div className={cls.link}>
        <a href="" onClick={() => i18next.changeLanguage("en")}>
          en
        </a>
        /
        <a href="" onClick={() => i18next.changeLanguage("pt")}>
          pt
        </a>
      </div>

      <div className={cls.right}>
        {!count && (
          <Link to={notificationLink ?? ""}>
            <div className={cls.notifications}>
              <Notification className={cls.notificationIcon} set="bulk" />
              {!count && <span className={cls.badge}>{count}</span>}
            </div>
          </Link>
        )}
        <div onClick={openSidebar(setEditSidebarOpen)} className={cls.profile}>
          <div className={cls.avatar}>
            <Iconly 
              set="bulk"
              name="User"
              size={28}
              primaryColor="#f4c721"
              secondaryColor="#f4e6b1"
            />
          </div>

          <div className={cls.name}>
            <h4>{data?.name}</h4>
            <p>{data?.login}</p>
          </div>
        </div>
        <Sidebar
          title="Edit profile"
          close={closeSidebar(setEditSidebarOpen)}
          open={editSidebarOpen}
        >
          {data && (
            <AdminForm
              data={data}
              submit={editAdmin}
              submitText="Save"
              mode="edit"
              logOut
            />
          )}
        </Sidebar>
      </div>
    </div>
  );
}

export default Navbar;
