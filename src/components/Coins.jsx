import React,{useState,useEffect}from 'react';
import axios from 'axios';
import Loader from './Loader';
import Header from './Header'
import "./Coins.css"
import { Link } from 'react-router-dom';
const Coins = () => {
const [loading,setloading]=useState(true);
const [coins,setCoins]=useState([])
const [currency,changeCurrency]=useState("inr")
const   currencySymbol= currency==="inr"? "₹":"$"

useEffect(()=>{
  const getCoinData= async()=>{
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&x_cg_demo_api_key=CG-aEFSafyhNM5NRjhKipzR48is`)
    setCoins(data);
    console.log(data);
    setloading(false)
  }
  getCoinData()
},[currency])
  return (
    <div>
    {loading? <Loader/> : <>
      <Header/>
      <div className="changer">
      <button onClick={()=>{
        changeCurrency("usd")
      }} >USD</button>
      <button onClick={()=>{
        changeCurrency("inr")
      }} >INR</button>
      </div>
      
      
      {coins.map((item,i)=>{
        return(
          <Link to={`/Coins/${item.id}`} style={{ textDecoration: "none", color: "white" }}
          >
          
          <div className='hovereffect'>
          <div key={i} className="ex-cards"  >
          
          <div className="image">
            <img src={item.image}alt="" height={"70px"} width={"70px"} />
          </div>
          <div className="name">{item.id}</div>
          <div className="price">{currencySymbol}  {item.current_price.toFixed(0)}</div>
          <div className="priceChange" style={{color:item.price_change_percentage_24h>=0?"green":"red" }}>{item.price_change_percentage_24h} {item.price_change_percentage_24h>=0?"↑":" ↓"}</div>
          {console.log("Run")
          }
        </div>
        </div>
        </Link>
        )
      })}
    </> }
  </div>
  )
}

export default Coins
