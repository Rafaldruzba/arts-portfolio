const isLocal = window.location.hostname === 'localhost'
const protocol = isLocal ? 'http' : 'https'
console.log(protocol)
export default protocol
