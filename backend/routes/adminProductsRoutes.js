const express = require('express')
const db = require('../db')
const router = express.Router()

// Dodawanie produktu (z walidacją)
router.post('/', async (req, res) => {
	try {
		const { title, description, collection, gender, style, mainImage, images } = req.body

		if (!title || !description || !collection || !gender || !style || !mainImage) {
			return res.status(400).json({ error: 'Uzupełnij wszystkie pola i dodaj główne zdjęcie.' })
		}

		const [result] = await db.execute(
			'INSERT INTO products (title, description, collection, gender, style) VALUES (?, ?, ?, ?, ?)',
			[title, description, collection, gender, style]
		)
		const productId = result.insertId

		// Główne zdjęcie
		await db.execute('INSERT INTO product_images (product_id, image_url, is_main) VALUES (?, ?, ?)', [
			productId,
			mainImage,
			true,
		])

		// Dodatkowe
		if (Array.isArray(images)) {
			for (const url of images) {
				if (url && url.trim() !== '') {
					await db.execute('INSERT INTO product_images (product_id, image_url, is_main) VALUES (?, ?, ?)', [
						productId,
						url,
						false,
					])
				}
			}
		}

		res.json({ message: 'Produkt dodany pomyślnie', id: productId })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Błąd przy dodawaniu produktu' })
	}
})

// Usuwanie produktu + zdjęć (po ID)
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		// najpierw sprawdzamy, czy produkt istnieje
		const [check] = await db.execute('SELECT id FROM products WHERE id = ?', [id])
		if (!check.length) return res.status(404).json({ error: 'Nie znaleziono produktu' })

		// ON DELETE CASCADE w SQL usunie też zdjęcia
		await db.execute('DELETE FROM products WHERE id = ?', [id])

		res.json({ message: '🗑️ Produkt i zdjęcia zostały usunięte' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Błąd przy usuwaniu produktu' })
	}
})

module.exports = router
