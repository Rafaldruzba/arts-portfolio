// Eksportuj wszystkie zmienne środowiskowe Vite jako obiekt
const isLocal = window.location.hostname === 'localhost'

const env = {
	API_URL: isLocal ? 'localhost:5000' : import.meta.env.VITE_API_URL,
}
export default env
