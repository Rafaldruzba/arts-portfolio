const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db')
const router = express.Router()

const SECRET = 'twoj_super_sekret_jwt' // zmień w .env później

// 🟢 Logowanie admina
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email])

		if (!rows.length) return res.status(401).json({ error: 'Nie znaleziono użytkownika' })
		const user = rows[0]

		const valid = await bcrypt.compare(password, user.password_hash)
		if (!valid) return res.status(401).json({ error: 'Błędne dane logowania' })

		if (user.role !== 'admin') return res.status(403).json({ error: 'Brak dostępu' })

		const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' })
		res.json({ token })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Błąd logowania' })
	}
})

// 🧩 Middleware do autoryzacji
function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization
	if (!authHeader) return res.status(401).json({ error: 'Brak tokenu' })
	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, SECRET)
		req.user = decoded
		next()
	} catch (err) {
		res.status(403).json({ error: 'Błędny token' })
	}
}

module.exports = { router, verifyToken }
