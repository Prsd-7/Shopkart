import { useState } from 'react'
import './App.css'

import Home from "./pages/Home";
import Products from "./pages/Products";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     <Home />
     <Products />
     
    </>
  )
}

export default App
