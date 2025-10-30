import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axiosInstance'

const AdminPage = () => {
	const navigate = useNavigate()
	const [deleteId, setDeleteId] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) navigate('/login')
	}, [navigate])

	const [product, setProduct] = useState({
		title: '',
		description: '',
		collection: '',
		gender: 'unisex',
		style: '',
		mainImage: '',
		images: [''],
	})

	const handleChange = e => {
		setProduct({ ...product, [e.target.name]: e.target.value })
	}

	const handleImageChange = (index, value) => {
		const updated = [...product.images]
		updated[index] = value
		setProduct({ ...product, images: updated })
	}

	const addImageField = () => {
		setProduct({ ...product, images: [...product.images, ''] })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('token')
		if (!token) return navigate('/login')

		try {
			await api.post('/admin/products', product, {
				headers: { Authorization: `Bearer ${token}` },
			})
			alert('✅ Produkt dodany!')
			setProduct({
				title: '',
				description: '',
				collection: '',
				gender: 'unisex',
				style: '',
				mainImage: '',
				images: [''],
			})
		} catch (err) {
			console.error(err)
			alert('❌ Błąd przy dodawaniu produktu')
		}
	}
	const handleDelete = async () => {
		if (!deleteId.trim()) return setMessage('❗ Podaj ID produktu')
		try {
			const token = localStorage.getItem('token') // zakładam, że token zapisywany po logowaniu
			await api.delete(`/admin/products/${deleteId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			setMessage('✅ Produkt usunięty')
			setDeleteId('')
		} catch (err) {
			setMessage(err.response?.data?.error || 'Błąd przy usuwaniu')
		}
	}

	return (
		<div className='p-8 max-w-lg mx-auto mt-10 shadow-lg border border-gray-300 rounded'>
			<h1 className='text-2xl mb-4 text-black'>Dodaj nowy produkt</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					name='title'
					placeholder='Tytuł'
					value={product.title}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'
				/>
				<textarea
					name='description'
					placeholder='Opis'
					value={product.description}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'
				/>
				<input
					name='collection'
					placeholder='Kolekcja'
					value={product.collection}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'
				/>
				<select
					name='gender'
					value={product.gender}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'>
					<option value='unisex'>Unisex</option>
					<option value='men'>Mężczyzna</option>
					<option value='women'>Kobieta</option>
				</select>
				<input
					name='style'
					placeholder='Styl'
					value={product.style}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'
				/>

				{/* Główne zdjęcie */}
				<input
					name='mainImage'
					placeholder='URL głównego zdjęcia'
					value={product.mainImage}
					onChange={handleChange}
					className='w-full p-2 border rounded text-black'
				/>

				{/* Dodatkowe zdjęcia */}
				<div className='space-y-2'>
					{product.images.map((url, i) => (
						<input
							key={i}
							placeholder={`URL zdjęcia ${i + 1}`}
							value={url}
							onChange={e => handleImageChange(i, e.target.value)}
							className='w-full p-2 border rounded text-black'
						/>
					))}
					<button type='button' onClick={addImageField} className='text-sm text-blue-600 hover:underline'>
						+ Dodaj kolejne zdjęcie
					</button>
				</div>

				<button type='submit' className='w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700'>
					Dodaj produkt
				</button>
			</form>

			<div className='bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-gray-300 mt-10'>
				<h2 className='text-xl font-semibold mb-4 text-black'>Usuń produkt</h2>

				<input
					type='number'
					value={deleteId}
					onChange={e => setDeleteId(e.target.value)}
					placeholder='ID produktu'
					className='border w-full p-2 rounded-lg mb-3 border-gray-300 text-black'
				/>

				<button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600'>
					Usuń produkt
				</button>

				{message && <p className='text-center mt-3 text-gray-700'>{message}</p>}
			</div>
		</div>
	)
}

export default AdminPage
