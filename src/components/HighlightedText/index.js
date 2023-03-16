import React from "react";

import cls from "./style.module.scss";

const HighlightedText = ({ selection = "", value }) => {
  return (
    <p
      className={cls.text}
      dangerouslySetInnerHTML={{
        __html: `${
          value
            ? value
                ?.toString()
                ?.toLowerCase?.()
                .replace?.(selection, `<span>${selection}</span>`)
            : "---"
        }`,
      }}
    />
  );
};

export default HighlightedText;
