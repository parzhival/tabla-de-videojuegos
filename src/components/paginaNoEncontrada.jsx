import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
    return (
        <div>
            <h2>404</h2>

            <p>
                La página que buscas no existe.
            </p>

            <Link to="/">
                Volver al inicio
            </Link>
        </div>
    );
}

export default PaginaNoEncontrada;