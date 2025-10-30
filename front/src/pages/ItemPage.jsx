import React from 'react'
import { useParams, Link } from 'react-router-dom'
import clothes from '../data/data.json'

const ItemPage = () => {
	const { id } = useParams()
	const item = clothes.find(p => p.id === parseInt(id))

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
					<img src={item.image} alt={item.title} className='w-full h-[400px] object-cover rounded-xl' />
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
