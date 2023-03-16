import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../Input';
import Button from '../../Button';

import cls from './style.module.scss';

const LoginSchema = Yup.object().shape({
	phone_number: Yup.string().min(5, 'Too Short!').required('Required'),
	password: Yup.string().min(5, 'Too Short!').required('Required'),
});

export default function LoginForm({ data = {}, submit }) {
	return (
		<Formik
			initialValues={data}
			onSubmit={submit}
			validationSchema={LoginSchema}
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
					<Input
						name="phone_number"
						placeholder="Phone"
						className={cls.input}
						value={values?.phone_number}
						error={touched?.phone_number && errors?.phone_number}
						onChange={handleChange}
						onBlur={handleBlur}
						{...props}
					/>
					<Input
						name="password"
						placeholder="Password"
						className={cls.input}
						value={values?.password}
						error={touched?.password && errors?.password}
						onChange={handleChange}
						onBlur={handleBlur}
						type={'password'}
						{...props}
					/>
					<Button className={cls.button} type="submit">
						Login
					</Button>
				</Form>
			)}
		</Formik>
	);
}
