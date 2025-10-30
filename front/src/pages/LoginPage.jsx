import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../utils/axiosInstance'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		try {
			const res = await api.post('/auth/login', { email, password })
			localStorage.setItem('token', res.data.token)
			navigate('/admin')
		} catch (err) {
			alert('Nieprawidłowe dane logowania')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form onSubmit={handleLogin} className='bg-white p-8 rounded-xl shadow-md w-80'>
				<h2 className='text-xl font-semibold mb-4 text-center text-black'>Panel logowania</h2>
				<input
					type='email'
					placeholder='E-mail'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='w-full p-2 mb-3 border rounded border-gray-300'
					required
				/>
				<input
					type='password'
					placeholder='Hasło'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='w-full p-2 mb-3 border rounded border-gray-300'
					required
				/>
				<button type='submit' className='w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700'>
					Zaloguj
				</button>
			</form>
		</div>
	)
}

export default LoginPage
