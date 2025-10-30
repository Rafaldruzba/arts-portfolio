import bcrypt from 'bcrypt'
import db from './db.js' // Twój plik połączenia z bazą danych

const createAdmin = async () => {
	const email = 'admin@emarika.pl'
	const password = 'HasloDoArtPortfolia123!'
	const password_hash = await bcrypt.hash(password, 10)

	await db.execute('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)', [email, password_hash, 'admin'])
	console.log('✅ Admin został dodany!')
}

createAdmin()
