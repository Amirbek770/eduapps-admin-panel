import cls from "./textArea.module.scss";

export default function TextArea({ setFieldValue, ...props }) {
  return (
    <div className={cls.container}>
      <textarea
        {...props}
        onChange={({ target: { value } }) => {
          setFieldValue(props.name, value);
        }}
      />
    </div>
  );
}
