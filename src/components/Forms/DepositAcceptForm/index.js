import { Formik, Form } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import Input from '../../Input';
import Button from '../../Button';
import InfoRow from '../../InfoRow';

import cls from './style.module.scss';

const schema = Yup.object().shape({
	amount: Yup.number().typeError('must be a number').required('required'),
});

export default function DepositAcceptForm({ data = {}, submit, info }) {
	return (
		<Formik
			initialValues={data}
			onSubmit={(values) => {
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
				<Form className={cls.form} autoComplete="off">
					<div className={cls.body}>
						<InfoRow title={'Name'} value={info?.user?.fullName} />
						<InfoRow title={'Email'} value={info?.user?.email} />
						<InfoRow
							title={'Requested Date'}
							value={moment(info?.createdAt).format(
								'HH:mm, yy-MM-DD'
							)}
						/>
						<Input
							name="amount"
							placeholder="Amount"
							value={values?.amount}
							error={touched?.amount && errors?.amount}
							onChange={handleChange}
							onBlur={handleBlur}
							{...props}
						/>
					</div>
					<div className={cls.btn}>
						<Button type="submit">Submit</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
