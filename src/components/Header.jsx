import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
import { IoRocketOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className='Navbar' >
    <div className="logo">
    <IoRocketOutline color='orange' size={35} />
        <h1>Crypto Colloseum</h1>
    </div>
    <ul>
        <li><Link to="./" >Home</Link></li>
        <li><Link to="./Coins">Coins</Link></li>
    </ul>
    
    </div>
  )
}

export default Header;