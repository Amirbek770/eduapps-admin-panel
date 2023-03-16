import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import InfoRow from '../../InfoRow';
import Button from '../../Button';

import cls from './style.module.scss';

const UpdateSchema = Yup.object().shape({
	agent: Yup.number().typeError('must be a number').required('required'),
});

export default function CustomerForm({ data = {}, submit }) {
	return (
		<Formik
			initialValues={data}
			onSubmit={(values) => {
				submit(UpdateSchema.cast(values, { stripUnknown: true }));
			}}
			validationSchema={UpdateSchema}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				isSubmitting,
				...props
			}) => (
				<Form className={cls.form} autoComplete="off">
					<InfoRow
						name="agent"
						title="Referal promo"
						value={values?.agent}
						error={touched?.agent && errors?.agent}
						onChange={handleChange}
						onBlur={handleBlur}
						editable={true}
						{...props}
					/>
					<Button className={cls.btn} type="submit">
						Save
					</Button>
				</Form>
			)}
		</Formik>
	);
}
