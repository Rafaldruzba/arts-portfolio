import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center'>
			<h1 className='text-9xl font-extrabold text-gray-300 mb-6'>404</h1>
			<h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>Ups… coś poszło nie tak!</h2>
			<p className='text-gray-600 mb-6'>Strona, której szukasz, nie istnieje lub została przeniesiona.</p>
			<button
				onClick={() => navigate('/')}
				className='bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors'>
				Wróć na stronę główną
			</button>
		</div>
	)
}

export default NotFound
