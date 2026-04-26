
import '../styles/Error.css'
import {Link} from 'react-router-dom'

export default function Error() {
    return <>
    <div className='error-body'>


        <div className="error-container">
            <div className="warning-icon"></div>

            <div className="error-card">
                <div className="error-header">
                    <div className="circle-x">×</div>
                    <h1>ERROR</h1>
                </div>

                <div className="error-content">
                    <h2>Errores al crear una página web</h2>
                    <span className="badge">Con su solución</span>

                    <p>Lo sentimos, ha ocurrido un problema inesperado. Por favor, intenta recargar la página o volver al inicio.</p>

                    <Link to={'/'} className="btn-back">VOLVER AL INICIO</Link>
                </div>
            </div>
        </div>
    </div>
    </>
}