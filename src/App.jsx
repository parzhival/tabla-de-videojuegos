import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import data from "./data/videojuegos";

import Videojuegos from "./components/tablavideojuegos";
import FormularioVideojuego from "./components/formularioVideojuegos";
import Navbar from "./components/navBar";
import PaginaNoEncontrada from "./components/paginaNoEncontrada";
import AlertaNotificacion from "./components/alertaNotificacion";


function App() {

  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");

    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "lista_videojuegos",
      JSON.stringify(videojuegos)
    );
  }, [videojuegos]);

  const agregar = (videojuego) => {

    const nuevoVideojuego = {
      ...videojuego,
      id: Date.now()
    };

    setVideojuegos([
      ...videojuegos,
      nuevoVideojuego
    ]);

    setMensaje("Videojuego agregado correctamente");
  };

  const eliminar = (id) => {

    const nuevosVideojuegos = videojuegos.filter(
      (videojuego) => videojuego.id !== id
    );

    setVideojuegos(nuevosVideojuegos);

    setMensaje("Videojuego eliminado correctamente");
  };

  const editar = (videojuegoActualizado) => {

    const nuevosVideojuegos = videojuegos.map(
      (videojuego) =>
        videojuego.id === videojuegoActualizado.id
          ? videojuegoActualizado
          : videojuego
    );

    setVideojuegos(nuevosVideojuegos);

    setMensaje("Videojuego actualizado correctamente");
  };


  return (

    <BrowserRouter>

      <Navbar />
      {mensaje && (
        <AlertaNotificacion mensaje={mensaje} />
      )}

      <Routes>

        <Route
          path="/"
          element={
            <Videojuegos
              videojuegos={videojuegos}
              onEliminar={eliminar}
            />
          }
        />

        <Route
          path="/nuevo"
          element={
            <FormularioVideojuego
              onAgregar={agregar}
              onEditar={editar}
            />
          }
        />

        <Route
          path="/editar"
          element={
            <FormularioVideojuego
              onAgregar={agregar}
              onEditar={editar}
            />
          }
        />

        <Route
          path="*"
          element={<PaginaNoEncontrada />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
