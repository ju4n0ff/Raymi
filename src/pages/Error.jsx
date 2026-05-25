import { Link } from 'react-router-dom'
import '../styles/Error.css'

export default function Error() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}
