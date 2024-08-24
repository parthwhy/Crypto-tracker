import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import bitcoin from "./bitcoin.png.png"
import "./CoinDetails.css"
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from '../CoinChart'
import Header from './Header'
const CoinDetails = () => {
const  {id} = useParams()
console.log(id);
const [coin,setCoin]=useState("");
const [loading,setloading]=useState(true)
const [currency,setCurrency]=useState("inr")
  useEffect(()=>{
    const getCoin=async ()=>{
      try {
        const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-aEFSafyhNM5NRjhKipzR48is`)
        console.log(data);
        setloading(false);
        setCoin(data);
      
      } catch (error) {
        console.log("Error lOADING PAGE");
        
      }
    }
    getCoin()
  },[])
  
  return (
  <div>
    <Header/>
    {loading ? <Loader/> : 
  <div className='coin-detail' >
    
  <div className="coin-info">
    <div className="buttons">
      <button onClick={()=>{
        setCurrency("inr")
      }} >INR</button>
      <button onClick={()=>{
        setCurrency("usd")
      }} >USD</button>
    </div>
    <div className="time">{coin.last_updated}</div>
    <div className="coin-image"><img src={coin.image.large} alt="" /></div>
    <div className="coin-name">{coin.name}</div>
    <div className="coin-price">{currency==="inr"? `₹${coin.market_data.
current_price.inr}` : `$ ${coin.market_data.
current_price.usd}`}</div>
    <div
  className="coin-profit"
  style={{
    color: coin.market_data.market_cap_change_percentage_24h >= 0 ? 'green' : 'red'
  }}
>
  {coin.market_data.market_cap_change_percentage_24h} 
  {coin.market_data.market_cap_change_percentage_24h >= 0 ? '↑' : '↓'}
    </div>


    <div className="market-rank"><IoPulseOutline color='orange'/>#{coin.market_cap_rank}</div>
    <div className="coin-desc"> <p>{coin.description.en.split('.')[0]}</p> </div>
  </div>
  <div className='graphContainer'>
  <CoinChart/>
  </div>
  </div>}</div>
  )
}

export default CoinDetails
