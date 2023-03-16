import React from "react";
import { Iconly } from "react-iconly";

import commorize from "../../utils/commorize";

import cls from "./style.module.scss";

function DashboardCard({ icon, title, amount, percent, currency }) {
  return (
    <div className={cls.card}>
      <div className={cls.icon}>
        {/* <img src="../../images/home.svg" alt="#" /> */}
        <Iconly
          set="bulk"
          name={icon ?? "Discount"}
          size={28}
          primaryColor="#f4c721"
          secondaryColor="#f4e6b1"
        />
      </div>

      <p className={cls.title}>{title}</p>
      <h2 className={cls.amount}>
        {currency}
        {amount ? amount : 0}
      </h2>

      {percent ? (
        <div
          className={[
            cls.indicator,
            percent < 0 ? cls.error : cls.success,
          ].join(" ")}
        >
          <Iconly
            className={cls.arrowUp}
            name={percent < 0 ? "ArrowDown" : "ArrowUp"}
          />
          {Math.abs(percent).toFixed(1)}% this day
        </div>
      ) : null}
    </div>
  );
}

export default DashboardCard;
