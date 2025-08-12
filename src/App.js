import React from 'react'


import './scss/app.scss'

import Header from "./components/Header"
import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import Notfound from './components/pages/Notfound'
import { Routes, Route } from 'react-router-dom'



function App() {
 
const [searchValue, SetSerchValue] = React.useState('')

  return (
    <div class="wrapper">
      <Header searchValue ={searchValue} SetSerchValue = {SetSerchValue} />
      <div class="content">
        
          <Routes>
            <Route path='/' element= {<Home searchValue ={searchValue} />} />
            <Route path='cart' element= {<Cart />} />
            <Route path='*' element= {<Notfound />} />
          </Routes>
          
          
      
      </div>
    </div>
  );

}

export default App;
