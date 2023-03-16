import { useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../../Input";
import Button from "../../Button";

import cls from "./style.module.scss";
import Dropdown from "../../Dropdown";
import ImageUpload from "../../ImageUpload";
import RadioButton from "../../RadioButton";

const CreateSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Required"),
});

const EditSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").optional(),
});

export default function PlannerForm({
  data = {},
  submit,
  submitText = "Submit",
  mode = "create",
}) {
  const schema = useMemo(() => {
    const schemas = {
      create: CreateSchema,
      edit: EditSchema,
    };

    return schemas[mode];
  }, [mode]);

  const names = [
    {
      name: "Active",
      value: true,
    },
    {
      name: "Inactive",
      value: false,
    },
  ];

  const types = [
    { label: "Start-up", value: "startup" },
    { label: "IT", value: "it" },
    { label: "Treyding", value: "treyding" },
    { label: "Product", value: "product" },
    { label: "Marketing", value: "marketing" },
  ];

  return (
    <Formik
      initialValues={data}
      onSubmit={(values, { setSubmitting }) => {
        submit(schema.cast(values, { stripUnknown: true }));
      }}
      validationSchema={schema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
        ...props
      }) => (
        <Form className={cls.form} autoComplete="off">
          <div className={cls.body}>
            <Input
              name="name"
              placeholder="Name"
              value={values?.name}
              error={touched?.name && errors?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="login"
              placeholder="Login"
              value={values?.login}
              error={touched?.login && errors?.login}
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="password"
              placeholder="Password"
              value={values?.password}
              error={touched?.password && errors?.password}
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <div className={cls.radio}>
              {names.map((item, index) => {
                return (
                  <RadioButton
                    key={index}
                    type={item.value ? "success" : "error"}
                    name={"active"}
                    label={item.name}
                    value={item.value}
                    checked={
                      item.value?.toString?.() === values?.active?.toString?.()
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                );
              })}
            </div>
            <Dropdown
              name="type"
              options={types}
              onChange={setFieldValue}
              onBlur={handleBlur}
              value={values?.type}
              error={touched?.type && errors?.type}
              {...props}
            />
            <ImageUpload
              name="image"
              value={values?.image}
              error={touched?.image && errors?.image}
              onChange={setFieldValue}
              onBlur={handleBlur}
              {...props}
            />
          </div>
          <div className={cls.btn}>
            <Button type="submit">{submitText}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
