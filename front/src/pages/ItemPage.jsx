import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/axiosInstance'

const ItemPage = () => {
	const { id } = useParams()
	const [item, setItem] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const res = await api.get(`/products/product/${id}`)
				setItem(res.data)
			} catch (err) {
				console.error('Błąd przy pobieraniu produktu:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchItem()
	}, [id])

	if (loading) return <p className='text-center mt-10'>Ładowanie...</p>

	if (!item) {
		return (
			<div className='min-h-screen flex flex-col justify-center items-center'>
				<p className='text-gray-600 text-xl'>Nie znaleziono produktu 😢</p>
				<Link to='/' className='mt-4 text-blue-500 underline'>
					Wróć do sklepu
				</Link>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6'>
			<div className='w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8'>
				<div className='flex-1'>
					<img
						src={item.images?.find(img => img.is_main)?.image_url || item.images?.[0]?.image_url}
						alt={item.title}
						className='w-full h-[400px] object-cover rounded-xl mb-4'
					/>

					{/* Miniaturki */}
					<div className='flex gap-3 overflow-x-auto'>
						{item.images?.map((img, i) => (
							<img
								key={i}
								src={img.image_url}
								alt=''
								className='w-24 h-24 object-cover rounded-lg border hover:scale-105 transition-transform'
							/>
						))}
					</div>
				</div>

				<div className='flex-1'>
					<h1 className='text-3xl font-bold text-gray-800 mb-4'>{item.title}</h1>
					<p className='text-gray-600 mb-4'>{item.description}</p>
					<p className='text-gray-500 mb-2'>Kolekcja: {item.collection}</p>
					<p className='text-gray-500 mb-6'>Dla: {item.gender}</p>

					<Link to='/' className='text-blue-600 font-semibold underline'>
						← Powrót do sklepu
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ItemPage
