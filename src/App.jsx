import React from 'react'

import Exchanges from './components/Exchanges'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Coins from "./components/Coins"
import CoinDetails from "./components/CoinDetails"
import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Exchanges/>} />
     <Route  path="/Coins" element={<Coins/>} />
     <Route path='/Coins/:id' element={<CoinDetails/>}/>
     <Route path='/Header' element={<Header/>} />
    </Routes>
    </BrowserRouter>

  )
  
}

export default App
