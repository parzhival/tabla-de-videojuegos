import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import data from "./data/videojuegos";

import Videojuegos from "./components/tablavideojuegos";
import FormularioVideojuego from "./components/formularioVideojuegos";
import Navbar from "./components/navBar";
import PaginaNoEncontrada from "./components/paginaNoEncontrada";


function App() {

  const [videojuegos, setVideojuegos] = useState(data);

  const agregar = (videojuego) => {

    const nuevoVideojuego = {
      ...videojuego,
      id: Date.now()
    };

    setVideojuegos([
      ...videojuegos,
      nuevoVideojuego
    ]);
  };

  const eliminar = (id) => {

    const nuevosVideojuegos = videojuegos.filter(
      (videojuego) => videojuego.id !== id
    );

    setVideojuegos(nuevosVideojuegos);
  };

  const editar = (videojuegoActualizado) => {

    const nuevosVideojuegos = videojuegos.map(
      (videojuego) =>
        videojuego.id === videojuegoActualizado.id
          ? videojuegoActualizado
          : videojuego
    );

    setVideojuegos(nuevosVideojuegos);
  };


  return (

    <BrowserRouter>

      <Navbar />

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
