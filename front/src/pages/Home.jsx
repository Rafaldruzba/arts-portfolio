import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axiosInstance'

const Home = () => {
	const [products, setProducts] = useState([])
	const [selectedCollection, setSelectedCollection] = useState('Wszystkie')
	const [selectedGender, setSelectedGender] = useState('Wszystkie')
	const [selectedStyle, setSelectedStyle] = useState('Wszystkie')

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await api.get('/products/')
				setProducts(res.data)
			} catch (err) {
				console.error('Błąd przy pobieraniu produktów:', err)
			}
		}
		fetchProducts()
	}, [])

	// Unikalne wartości
	const collections = ['Wszystkie', ...new Set(products.map(item => item.collection))]
	const genders = ['Wszystkie', ...new Set(products.map(item => item.gender))]
	const styles = ['Wszystkie', ...new Set(products.map(item => item.style))]

	// Filtrowanie
	const filtered = products.filter(item => {
		const matchCollection = selectedCollection === 'Wszystkie' || item.collection === selectedCollection
		const matchGender = selectedGender === 'Wszystkie' || item.gender === selectedGender
		const matchStyle = selectedStyle === 'Wszystkie' || item.style === selectedStyle
		return matchCollection && matchGender && matchStyle
	})

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6'>
			<div className='text-center mb-8'>
				<h1 className='text-4xl font-extrabold text-gray-800 mb-3'>Nasze Koszulki</h1>
				<div className='w-24 h-[2px] bg-gray-300 mx-auto'></div>
			</div>

			{/* Filtry */}
			<div className='flex flex-wrap justify-center gap-6 mb-10 bg-white shadow-sm rounded-xl p-4'>
				{/* Kolekcja */}
				<div className='flex flex-col'>
					<label className='text-gray-700 font-semibold mb-1'>Kolekcja:</label>
					<select
						value={selectedCollection}
						onChange={e => setSelectedCollection(e.target.value)}
						className='px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400'>
						{collections.map((col, i) => (
							<option key={i} value={col}>
								{col}
							</option>
						))}
					</select>
				</div>

				{/* Gender */}
				<div className='flex flex-col'>
					<label className='text-gray-700 font-semibold mb-1'>Dla kogo:</label>
					<select
						value={selectedGender}
						onChange={e => setSelectedGender(e.target.value)}
						className='px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400'>
						{genders.map((g, i) => (
							<option key={i} value={g}>
								{g}
							</option>
						))}
					</select>
				</div>

				{/* Styl */}
				<div className='flex flex-col'>
					<label className='text-gray-700 font-semibold mb-1'>Styl:</label>
					<select
						value={selectedStyle}
						onChange={e => setSelectedStyle(e.target.value)}
						className='px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400'>
						{styles.map((s, i) => (
							<option key={i} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Siatka */}
			<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl'>
				{filtered.map((item, index) => (
					<Link to={`/item/${item.id}`} key={index}>
						<div className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
							<div className='overflow-hidden h-[220px]'>
								<img
									src={item.mainImage}
									alt={item.title}
									className='w-full h-[220px] object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-300'
								/>
							</div>
							<div className='p-4'>
								<h2 className='text-lg font-semibold text-gray-800 mb-1'>{item.title}</h2>
								<p className='text-sm text-gray-600 mb-3 line-clamp-2'>{item.description}</p>
								<div className='flex justify-between text-sm text-gray-500 border-t pt-2'>
									<span>Kolekcja: {item.collection}</span>
									<span>{item.gender}</span>
								</div>
							</div>
						</div>
					</Link>
				))}
			</section>

			{filtered.length === 0 && <p className='text-gray-500 mt-10 text-lg'>Brak produktów spełniających filtry.</p>}
		</div>
	)
}

export default Home
