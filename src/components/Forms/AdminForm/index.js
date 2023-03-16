import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../Input';
import Button from '../../Button';

import cls from './style.module.scss';
import { useNavigate } from 'react-router';

const CreateSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').required('Required'),
	login: Yup.string().min(5, 'Too Short!').required('Required'),
	password: Yup.string().min(8, 'Too Short!').required('Required'),
});

const EditSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').optional(),
	login: Yup.string().min(5, 'Too Short!').optional(),
	password: Yup.string().min(8, 'Too Short!').optional(),
});

export default function AdminForm({
	data = {},
	submit,
	submitText = 'Submit',
	mode = 'create',
	logOut,
}) {
	const schema = useMemo(() => {
		const schemas = {
			create: CreateSchema,
			edit: EditSchema,
		};

		return schemas[mode];
	}, [mode]);

	const navigate = useNavigate();

	const handleLogout = () => {
		window?.localStorage.removeItem('token');
		navigate('/login');
	};
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
				isSubmitting,
				...props
			}) => (
				<Form className={cls.form}>
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
							type="password"
							name="password"
							placeholder="Password"
							value={values?.password}
							error={touched?.password && errors?.password}
							onChange={handleChange}
							onBlur={handleBlur}
							autoComplete="off"
							{...props}
						/>
					</div>
					<div className={cls.btn}>
						{logOut && (
							<Button
								iconClassName={cls.icon}
								icon={'Logout'}
								className={cls.logOut}
								onClick={handleLogout}
								type="button"
							>
								Log Out
							</Button>
						)}
						<Button type="submit">{submitText}</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
