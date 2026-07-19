import { useState } from 'react'

import './App.css'
import data from './data/videojuegos'
import Videojuegos from './components/tablavideojuegos';

function App() {
  
  const [videojuegos] = useState(data);
  return (
    <div>
      <br />
      <Videojuegos videojuegos = {videojuegos}/>

    </div>
  )
}

export default App
