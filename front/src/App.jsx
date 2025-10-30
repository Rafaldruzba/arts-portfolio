import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Tu może być navbar */}
			<Outlet /> {/* <-- tu wchodzi Home lub ItemPage */}
			{/* Tu może być footer */}
		</div>
	)
}

export default App
