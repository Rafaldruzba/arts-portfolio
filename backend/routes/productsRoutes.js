const express = require('express')
const db = require('../db')
const router = express.Router()

// 🟢 Wszystkie produkty z głównym zdjęciem (dla strony Home)
router.get('/', async (req, res) => {
	try {
		const [rows] = await db.execute(`
			SELECT 
				p.id, p.title, p.description, p.collection, p.gender, p.style,
				(SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) AS mainImage
			FROM products p
			ORDER BY p.created_at DESC
		`)
		res.json(rows)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Błąd przy pobieraniu produktów' })
	}
})

// 🟡 Szczegóły jednego produktu (dla ItemPage)
router.get('/product/:id', async (req, res) => {
	try {
		const { id } = req.params

		// Produkt
		const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [id])
		if (products.length === 0) return res.status(404).json({ error: 'Produkt nie znaleziony' })
		const product = products[0]

		// Zdjęcia
		const [images] = await db.execute(
			'SELECT image_url, is_main FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC',
			[id]
		)

		product.images = images

		res.json(product)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Błąd przy pobieraniu produktu' })
	}
})

module.exports = router
