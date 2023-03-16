import { useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../../Input";
import TextArea from "../../TextArea";
import Button from "../../Button";
import RadioButton from "../../RadioButton";
import ImageUpload from "../../ImageUpload";
import Dropdown from "../../Dropdown";

import cls from "./style.module.scss";

const CreateSchema = Yup.object().shape({
  image: Yup.object().shape({
    _id: Yup.string(),
    url: Yup.string(),
    key: Yup.string(),
  }),
  name: Yup.object()
    .shape({
      en: Yup.string().typeError("must be a string").required("required"),
      pt: Yup.string().typeError("must be a string").required("required"),
    })
    .default({ en: "", pt: "" }),
  description: Yup.object()
    .shape({
      en: Yup.string().typeError("must be a string").required("required"),
      pt: Yup.string().typeError("must be a string").required("required"),
    })
    .default({ en: "", pt: "" }),
  type: Yup.string()
    .oneOf(["startup", "smallcompany", "hedgefund"])
    .default("startup")
    .required("required"),
  active: Yup.boolean().optional(),
  investment: Yup.object().shape({
    percent: Yup.number().typeError("must be a number").required("required"),
    duration: Yup.object()
      .shape({
        en: Yup.string().typeError("must be a string").required("required"),
        pt: Yup.string().typeError("must be a string").required("required"),
      })
      .default({ en: "", pt: "" }),
    amount: Yup.object().shape({
      from: Yup.number()
        .typeError("must be a number")
        .min(1, "must be greater than 0")
        .required("required"),
      to: Yup.number()
        .typeError("must be a number")
        .moreThan(Yup.ref("from"), `must be greater than 'from'`)
        .required("required"),
    }),
    reinvest: Yup.number()
      .nullable(true)
      .min(1, "must be greater than 0")
      .transform((value) => (value ? value : null))
      .typeError("must be a number")
      .optional(),
  }),
});

const EditSchema = Yup.object().shape({
  image: Yup.object()
    .shape({
      _id: Yup.string(),
      url: Yup.string(),
      key: Yup.string(),
    })
    .optional(),
  name: Yup.object().shape({
    en: Yup.string().typeError("must be a string").optional(),
    pt: Yup.string().typeError("must be a string").optional(),
  }),
  description: Yup.object().shape({
    en: Yup.string().typeError("must be a string").optional(),
    pt: Yup.string().typeError("must be a string").optional(),
  }),
  type: Yup.string().oneOf(["startup", "smallcompany", "hedgefund"]).optional(),
  active: Yup.boolean().optional(),
  investment: Yup.object().shape({
    percent: Yup.number().typeError("must be a number").optional(),
    duration: Yup.object().shape({
      en: Yup.string().typeError("must be a string").optional(),
      pt: Yup.string().typeError("must be a string").optional(),
    }),
    amount: Yup.object().shape({
      from: Yup.number()
        .typeError("must be a number")
        .min(1, "must be greater than 0")
        .optional(),
      to: Yup.number()
        .typeError("must be a number")
        .moreThan(Yup.ref("from"), `must be greater than 'from'`)
        .optional(),
    }),
    reinvest: Yup.number()
      .min(1, "must be greater than 0")
      .nullable(true)
      .transform((value) => (value ? value : null))
      .typeError("must be a number")
      .optional(),
  }),
});

export default function CompanyForm({
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
    { label: "Small company", value: "smallcompany" },
    { label: "Hedge Fund", value: "hedgefund" },
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
          {mode === 'edit' && <p>ID: {values._id}</p>}
            <Input
              name="title"
              placeholder="Title"
              value={values?.title}
              error={touched?.title && errors?.title}
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="desc"
              placeholder="Description"
              value={values?.desc}
              error={touched?.desc && errors?.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="version"
              placeholder="Version"
              value={values?.version}
              error={
                touched?.version && errors?.version
              }
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="support.link_tg"
              placeholder="Amount on hold English"
              value={values?.support?.link_tg}
              error={
                touched?.support?.link_tg &&
                errors?.support?.link_tg
              }
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            <Input
              name="support.link_tg"
              placeholder="Amount on hold Portugal"
              value={values?.support?.link_tg}
              error={
                touched?.support?.link_tg &&
                errors?.support?.link_tg
              }
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
            <Input
              name="support.link_tg"
              placeholder="Amount on hold Portugal"
              value={values?.support?.link_tg}
              error={
                touched?.support?.link_tg &&
                errors?.support?.link_tg
              }
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
            
            <TextArea
              name="description.pt"
              placeholder="Description Portugal"
              value={values?.description?.pt}
              error={touched?.description?.pt && errors?.description?.pt}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              {...props}
            />
            
            {/* <div className={cls.fromTo}>
              <Input
                name="investment.amount.from"
                placeholder="from"
                value={values?.investment?.amount?.from}
                error={
                  touched?.investment?.amount?.from &&
                  errors?.investment?.amount?.from
                }
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
              />
              <Input
                name="investment.amount.to"
                placeholder="To"
                value={values?.investment?.amount?.to}
                error={
                  touched?.investment?.amount?.to &&
                  errors?.investment?.amount?.to
                }
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
              />
            </div>
            <Input
              name="investment.reinvest"
              placeholder="reinvest"
              value={values?.investment?.reinvest}
              error={
                touched?.investment?.reinvest && errors?.investment?.reinvest
              }
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            /> */}
            {/* <Dropdown
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
            /> */}
          </div>
          <div className={cls.btn}>
            <Button type="submit">{submitText}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
