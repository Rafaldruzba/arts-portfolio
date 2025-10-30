const express = require('express')
const db = require('../db')
const router = express.Router()

// 🟢 Pobieranie produktów (publiczne)
router.get('/', async (req, res) => {
	const [rows] = await db.execute('SELECT * FROM products')
	res.json(rows)
})

// 🔴 Dodawanie produktów (tylko admin — bo verifyToken jest w server.js)
router.post('/', async (req, res) => {
	const { title, description, collection, gender, style } = req.body
	await db.execute('INSERT INTO products (title, description, collection, gender, style) VALUES (?, ?, ?, ?, ?)', [
		title,
		description,
		collection,
		gender,
		style,
	])
	res.json({ message: 'Produkt dodany pomyślnie' })
})

module.exports = router
