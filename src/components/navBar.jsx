import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <h1>Videojuegos</h1>

            <div className="navbar-links">

                <Link to="/">
                    Lista de videojuegos
                </Link>

                <Link to="/nuevo">
                    Nuevo videojuego
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;