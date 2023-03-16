import React, { useMemo, useState } from "react";
import { Iconly } from "react-iconly";

import cls from "./style.module.scss";

function Input({ icon, iconSet, label, className, type = "text", error, ...props }) {
  const [visible, setVisible] = useState(false);

  let { _icon, _type } = useMemo(() => {
    if (type === "password") {
      if (visible)
        return {
          _icon: "Show",
          _type: "text",
        };
      else
        return {
          _icon: "Hide",
          _type: "password",
        };
    }

    return {
      _icon: icon,
      _type: type,
    };
  }, [visible, type, icon]);

  return (
    <div className={cls.relative}>
      <div
        className={`${cls.container} ${error ? cls.invalid : ""} ${className} `}
      >
        {label && <p className={cls.label}>{label}</p>}
        <input
          className={cls.input}
          type={_type}
          {...props}
          autoComplete="off"
        />

        {_icon && (
          <Iconly
            className={cls.icon}
            name={_icon}
            set={iconSet}
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
      {error && <span className={cls.error}>{error}</span>}
    </div>
  );
}

export default Input;
