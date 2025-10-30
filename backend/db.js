const mysql = require('mysql2/promise')
require('dotenv').config() // Ładowanie zmiennych z pliku .env

// Konfiguracja połączenia z bazą danych
const db = mysql.createPool({
	host: process.env.DB_HOST, // Host bazy danych
	user: process.env.DB_USER, // Użytkownik bazy danych
	password: process.env.DB_PASSWORD, // Hasło do bazy danych
	database: process.env.DB_NAME, // Nazwa bazy danych
	port: process.env.DB_PORT, // Port bazy danych
	timezone: 'Z', // Ustawienie strefy czasowej na UTC
	waitForConnections: true,
	connectionLimit: 10,
})

// Funkcja testowa połączenia
;(async () => {
	try {
		const connection = await db.getConnection() // Pobierz połączenie z puli
		await connection.query("SET time_zone = '+00:00'") // Ustaw strefę czasową na UTC
		console.log('----------------  Połączono z bazą danych MySQL  ---------------')
		connection.release() // Zwróć połączenie do puli
	} catch (error) {
		console.error('Błąd połączenia z bazą danych:', error)
	}
})()

module.exports = db
