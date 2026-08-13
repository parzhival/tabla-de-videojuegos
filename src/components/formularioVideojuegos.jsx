import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({ onAgregar, onEditar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoEditar = location.state?.videojuego;

    const [formulario, setFormulario] = useState(
        videojuegoEditar || {
            titulo: "",
            genero: "",
            plataforma: "",
            lanzamiento: "",
            precio: 0,
            disponible: false,
            progreso: 0
        }
    );

    const manejarCambio = (e) => {

        const { name, value, type, checked } = e.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const manejarSubmit = (e) => {

        e.preventDefault();

        if (videojuegoEditar) {
            onEditar(formulario);
        } else {
            onAgregar(formulario);
        }

        navigate("/");
    };

    return (
        <div>

            <h2>
                {videojuegoEditar
                    ? "Editar Videojuego"
                    : "Nuevo Videojuego"}
            </h2>

            <form onSubmit={manejarSubmit}>

                <label>Título:</label>

                <input
                    type="text"
                    name="titulo"
                    value={formulario.titulo}
                    onChange={manejarCambio}
                />

                <label>Género:</label>

                <select
                    name="genero"
                    value={formulario.genero}
                    onChange={manejarCambio}
                >
                    <option value="">Seleccione</option>
                    <option value="Accion">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Deportes">Deportes</option>
                    <option value="RPG">RPG</option>
                </select>

                <label>Plataforma:</label>

                <input
                    type="text"
                    name="plataforma"
                    value={formulario.plataforma}
                    onChange={manejarCambio}
                />

                <label>Lanzamiento:</label>

                <input
                    type="date"
                    name="lanzamiento"
                    value={formulario.lanzamiento}
                    onChange={manejarCambio}
                />

                <label>Precio:</label>

                <input
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={manejarCambio}
                />

                <label>
                    <input
                        type="checkbox"
                        name="disponible"
                        checked={formulario.disponible}
                        onChange={manejarCambio}
                    />

                    Disponible
                </label>

                <label>Progreso:</label>

                <input
                    type="number"
                    name="progreso"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formulario.progreso}
                    onChange={manejarCambio}
                />

                <button type="submit">
                    {videojuegoEditar ? "Guardar cambios" : "Agregar"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Cancelar
                </button>

            </form>

        </div>
    );
}

export default FormularioVideojuego;