import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AdminPage = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) navigate('/login')
	}, [])

	const [product, setProduct] = useState({
		title: '',
		description: '',
		collection: '',
		gender: 'unisex',
		style: '',
		images: [],
	})

	const handleChange = e => {
		setProduct({ ...product, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('token')
		if (!token) return navigate('/login')

		try {
			await api.post('/api/products', product, {
				headers: { Authorization: `Bearer ${token}` },
			})
			alert('Produkt dodany!')
		} catch (err) {
			console.error(err)
			alert('Błąd przy dodawaniu produktu')
		}
	}

	return (
		<div className='p-8 max-w-lg mx-auto border-gray-300 rounded mt-10 shadow-lg'>
			<h1 className='text-2xl text-black mb-4'>Dodaj nowy produkt</h1>
			<form onSubmit={handleSubmit} className='space-y-4 border-gray-300 '>
				<input
					name='title'
					placeholder='Tytuł'
					onChange={handleChange}
					className='w-full p-2 border rounded border-gray-300 text-black'
				/>
				<textarea
					name='description'
					placeholder='Opis'
					onChange={handleChange}
					className='w-full p-2 border rounded border-gray-300 text-black'
				/>
				<input
					name='collection'
					placeholder='Kolekcja'
					onChange={handleChange}
					className='w-full p-2 border rounded border-gray-300 text-black'
				/>
				<select name='gender' onChange={handleChange} className='w-full p-2 border rounded border-gray-300 text-black'>
					<option value='unisex'>Unisex</option>
					<option value='men'>Mężczyzna</option>
					<option value='women'>Kobieta</option>
				</select>
				<input
					name='style'
					placeholder='Styl'
					onChange={handleChange}
					className='w-full p-2 border rounded border-gray-300 text-black'
				/>
				<button type='submit' className='w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700'>
					Dodaj produkt
				</button>
			</form>
		</div>
	)
}

export default AdminPage
