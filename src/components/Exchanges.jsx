import React,{useState,useEffect}from 'react'
import Header from './Header'
import axios from 'axios';
import Loader from './Loader';
import bitcoin from "./bitcoin.png.png"
import "./Exchanges.css"
const Exchanges = () => {
const [loading,setloading]=useState(true);
const [exchanges,setExchanges]=useState([])
useEffect(()=>{
  const getExchangeData= async()=>{
    const {data}=await axios.get("https://api.coingecko.com/api/v3/exchanges?x_cg_demo_api_key=CG-aEFSafyhNM5NRjhKipzR48is")
    setExchanges(data);
    console.log(data);
    setloading(false)
  }
  getExchangeData()
},[])

  return (
    <div>
      {loading? <Loader/> : <>
        <Header/>
        <div className="ex-cards heading">
          <div className="image name abc">
         Image
          </div>
          <div className="name">Name</div>
          <div className="price">Trade Volume</div>
          <div className="rank">Rank</div>
        
        </div>
        {exchanges.map((item,i)=>{
          return(<div key={i} className="ex-cards">
            
            <div className="image">
              <img src={item.image}alt="" height={"70px"} width={"70px"} />
            </div>
            <div className="name">{item.name}</div>
            <div className="price">{item.trade_volume_24h_btc.toFixed(0)}</div>
            <div className="rank">{item.trust_score_rank}</div>
            {console.log("Run")
            }
          </div>)
        })}
      </> }
    </div>
  )
}

export default Exchanges
