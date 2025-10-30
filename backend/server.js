const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)

// CORS dla portów
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173', 'https://tech.emarika.pl'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Dozwolone metody HTTP
		allowedHeaders: ['Content-Type', 'Authorization'], // Dozwolone nagłówki
		credentials: true,
	})
)
// Middleware
app.use(express.json()) // Parsowanie JSON w treści żądań

// Trasy API
const { router: authRoutes, verifyToken } = require('./routes/authRoutes')
const productsRoutes = require('./routes/productsRoutes')
app.use('/api', authRoutes)
app.use('/api/products', verifyToken, productsRoutes)

// Zwiększ limit wielkości żądania
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

//DEAFAULT ENDPOINT
app.get('/', (req, res) => {
	res.send({ message: 'Serwer działa poprawnie!' })
})

// Obsługa braku endpointów
app.use((req, res, next) => {
	res.status(404).json({ message: 'Endpoint not found' })
})

// Obsługa błędów serwera
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Server error' })
})

// Uruchomienie serwera
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
	console.log(` - - - - - - - -Serwer nasłuchuje na porcie ${PORT} - - - - - - - -`)
})
