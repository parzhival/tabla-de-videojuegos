import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./formularioVideojuegos.css";


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
            progreso: 0,
            sinopsis: "",
            calificacion: ""
        }
    );

    const [errores, setErrores] = useState({});

    const fechaActual = new Date().toISOString().split("T")[0];

    const manejarCambio = (e) => {

        const { name, value, type, checked } = e.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });

        setErrores({
            ...errores,
            [name]: ""
        });
    };

    const validarFormulario = () => {

        const erroresActivos = {};

        if (!formulario.titulo.trim()) {
            erroresActivos.titulo = "El título es obligatorio.";
        } else if (formulario.titulo.trim().length < 3) {
            erroresActivos.titulo =
                "El título debe tener al menos 3 caracteres.";
        }

        if (!formulario.genero) {
            erroresActivos.genero =
                "Debes seleccionar un género.";
        }

        if (!formulario.plataforma.trim()) {
            erroresActivos.plataforma =
                "La plataforma es obligatoria.";
        }

        if (!formulario.lanzamiento) {

            erroresActivos.lanzamiento =
                "La fecha de lanzamiento es obligatoria.";

        } else if (formulario.lanzamiento > fechaActual) {

            erroresActivos.lanzamiento =
                "La fecha no puede ser futura.";
        }

        if (formulario.precio === "" || formulario.precio < 0) {

            erroresActivos.precio =
                "El precio debe ser un número válido.";
        }

        if (!formulario.sinopsis.trim()) {

            erroresActivos.sinopsis =
                "La sinopsis es obligatoria.";

        } else if (formulario.sinopsis.trim().length < 10) {

            erroresActivos.sinopsis =
                "La sinopsis debe tener al menos 10 caracteres.";

        } else if (formulario.sinopsis.trim().length > 250) {

            erroresActivos.sinopsis =
                "La sinopsis no puede superar los 250 caracteres.";
        }

        if (
            formulario.calificacion === "" ||
            formulario.calificacion < 1 ||
            formulario.calificacion > 100
        ) {

            erroresActivos.calificacion =
                "La calificación debe estar entre 1 y 100.";
        }


        return erroresActivos;
    };

    const manejarSubmit = (e) => {

        e.preventDefault();

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {

            setErrores(erroresActivos);

            return;
        }

        if (videojuegoEditar) {

            onEditar(formulario);

        } else {

            onAgregar(formulario);
        }

        navigate("/");
    };


    return (

        <div className="formulario-contenedor">
            <div className="formulario-card">
                <div className="formulario-header">
                    <span className="formulario-icono">
                        🎮
                    </span>
                    <h2>
                        {videojuegoEditar
                            ? "Editar Videojuego"
                            : "Nuevo Videojuego"}
                    </h2>
                    <p>
                        Completa la información del videojuego
                    </p>
                </div>


                <form onSubmit={manejarSubmit}>
                    <div className="campo">
                        <label htmlFor="titulo">
                            Título del videojuego
                        </label>
                        <input
                            id="titulo"
                            type="text"
                            name="titulo"
                            placeholder="Ej: The Legend of Zelda"
                            value={formulario.titulo}
                            onChange={manejarCambio}
                        />

                        {errores.titulo && (
                            <span className="error-mensaje">
                                {errores.titulo}
                            </span>
                        )}

                    </div>
                    <div className="campo">

                        <label htmlFor="genero">
                            Género
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            value={formulario.genero}
                            onChange={manejarCambio}
                        >

                            <option value="">
                                Seleccione un género
                            </option>

                            <option value="Accion">
                                Acción
                            </option>

                            <option value="Aventura">
                                Aventura
                            </option>

                            <option value="Deportes">
                                Deportes
                            </option>

                            <option value="RPG">
                                RPG
                            </option>

                        </select>

                        {errores.genero && (
                            <span className="error-mensaje">
                                {errores.genero}
                            </span>
                        )}

                    </div>

                    <div className="campo">

                        <label htmlFor="plataforma">
                            Plataforma
                        </label>

                        <input
                            id="plataforma"
                            type="text"
                            name="plataforma"
                            placeholder="Ej: PlayStation 5"
                            value={formulario.plataforma}
                            onChange={manejarCambio}
                        />

                        {errores.plataforma && (
                            <span className="error-mensaje">
                                {errores.plataforma}
                            </span>
                        )}

                    </div>

                    <div className="campo">

                        <label htmlFor="lanzamiento">
                            Fecha de lanzamiento
                        </label>

                        <input
                            id="lanzamiento"
                            type="date"
                            name="lanzamiento"
                            max={fechaActual}
                            value={formulario.lanzamiento}
                            onChange={manejarCambio}
                        />

                        {errores.lanzamiento && (
                            <span className="error-mensaje">
                                {errores.lanzamiento}
                            </span>
                        )}

                    </div>

                    <div className="campo">

                        <label htmlFor="precio">
                            Precio
                        </label>

                        <input
                            id="precio"
                            type="number"
                            name="precio"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={formulario.precio}
                            onChange={manejarCambio}
                        />

                        {errores.precio && (
                            <span className="error-mensaje">
                                {errores.precio}
                            </span>
                        )}

                    </div>

                    <div className="campo">

                        <label htmlFor="sinopsis">
                            Sinopsis / Descripción
                        </label>

                        <textarea
                            id="sinopsis"
                            name="sinopsis"
                            placeholder="Escribe una breve descripción del videojuego..."
                            maxLength="250"
                            value={formulario.sinopsis}
                            onChange={manejarCambio}
                        ></textarea>

                        <div className="contador">

                            {formulario.sinopsis.length} / 250 caracteres

                        </div>

                        {errores.sinopsis && (
                            <span className="error-mensaje">
                                {errores.sinopsis}
                            </span>
                        )}

                    </div>

                    <div className="campo">

                        <label htmlFor="calificacion">
                            Calificación de la crítica
                        </label>

                        <input
                            id="calificacion"
                            type="number"
                            name="calificacion"
                            min="1"
                            max="100"
                            step="1"
                            placeholder="1 - 100"
                            value={formulario.calificacion}
                            onChange={manejarCambio}
                        />

                        {errores.calificacion && (
                            <span className="error-mensaje">
                                {errores.calificacion}
                            </span>
                        )}

                    </div>

                    <div className="campo-checkbox">

                        <input
                            id="disponible"
                            type="checkbox"
                            name="disponible"
                            checked={formulario.disponible}
                            onChange={manejarCambio}
                        />

                        <label htmlFor="disponible">
                            Videojuego disponible
                        </label>

                    </div>

                    <div className="campo">

                        <label htmlFor="progreso">
                            Progreso
                        </label>

                        <input
                            id="progreso"
                            type="number"
                            name="progreso"
                            min="0"
                            max="1"
                            step="0.1"
                            value={formulario.progreso}
                            onChange={manejarCambio}
                        />

                    </div>

                    <div className="botones-formulario">

                        <button
                            type="submit"
                            className="btn-guardar"
                        >
                            {videojuegoEditar
                                ? "Guardar cambios"
                                : "Agregar videojuego"}
                        </button>


                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={() => navigate("/")}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default FormularioVideojuego;