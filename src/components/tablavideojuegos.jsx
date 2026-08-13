import "./tablavideojuegos.css"
import { useNavigate } from "react-router-dom";

function Videojuegos({ videojuegos, onEliminar }) {

    const navigate = useNavigate();

    return (
        <div className="videojuegos">
            <div className="videojuegos-header">
                <h2>Tabla de Videojuegos</h2>
                <p>Catalogo</p>
            </div>
            <div className="tabla-container">
                <table className="tabla-videojuegos">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Genero</th>
                            <th>Plataforma</th>
                            <th>Lanzamiento</th>
                            <th>Precio</th>
                            <th>Disponibilidad</th>
                            <th>Progreso</th>
                            <th>Sinopsis</th>
                            <th>Calificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {videojuegos.map((vid) => (
                            <tr key={vid.id}>
                                <td>{vid.titulo}</td>
                                <td>{vid.genero}</td>
                                <td>{vid.plataforma}</td>
                                <td>{vid.lanzamiento}</td>
                                <td>{vid.precio}</td>
                                <td>{vid.disponible}</td>
                                <td>
                                    <div className="progreso-container">
                                        <progress
                                            value={vid.progreso}
                                            max={1}
                                        ></progress>
                                        <span>{Math.round(vid.progreso * 100)}%</span>
                                    </div>
                                </td>
                                <td>{vid.sinopsis}</td>
                                <td>{vid.calificacion}/100</td>
                                <td>
                                    <button
                                        className="btn-editar"
                                        onClick={() =>
                                            navigate("/editar", {
                                                state: {
                                                    videojuego: vid
                                                }
                                            })
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button 
                                    className="btn-eliminar"
                                    onClick={() => onEliminar(vid.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>

                        ))}


                    </tbody>
                </table>


            </div>


        </div>

    )
}

export default Videojuegos