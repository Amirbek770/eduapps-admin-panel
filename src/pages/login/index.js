import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useLoginMutation from '../../hooks/mutations/useLoginMutation';

import cls from './login.module.scss';
import LoginForm from '../../components/Forms/LoginForm';
import useProfileQuery from '../../hooks/queries/useProfileQuery';
import axios from 'axios';

function Login(props) {
	const [loading, setloading] = useState(false)


	const { mutateAsync: loginMutation } = useLoginMutation();
	const navigate = useNavigate();
	const  profile  = useProfileQuery();

	const onSubmit = async (data) => {
		console.log('obSubmit', data);
		setloading(true)
		toast
			.promise( axios.post('https://api.edulab.uz/api/user/admin/login', {
				phone_number: data.phone_number,
				password: data.password
			}), {
				loading: 'Logging in!',
				success: 'Success!',
				error: (error) => error?.response?.data?.message,
			})
			.then((res) => {
				setloading(false)
				console.log('login onSubmit success', res.data);
				localStorage.setItem('token', res.data.token);
				openDashboard();
			})
			.catch(err => {
				setloading(false)
				console.log('error onsubmit login', err.response.data);
			})
		
	};

	const openDashboard = () => {
		navigate(props?.from?.pathname ?? '/dashboard', { replace: true });
	};

	if(loading)<h1 className={cls.title}>...Loading dashboard</h1>
	

	return (
		<div className={cls.container}>
			<div className={cls.content}>
				<h1 className={cls.title}>Login</h1>
				<LoginForm submit={onSubmit} />
			</div>
		</div>
	);
}

export default Login;
