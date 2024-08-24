import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { BsBorderWidth } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import "./CoinChart.css"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const CoinChart = (prop) => {
    const { id}=useParams();

    const [chartData,setChartData]=useState([])
    const [days,setDays]=useState(30)
    const coinChartData=async()=>{
       try {
        const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}&x_cg_demo_api_key=CG-aEFSafyhNM5NRjhKipzR48is`)
       console.log(data.prices);
       setChartData(data.prices)
       } catch (error) {
        console.log(error);
        
       }
       
    }
    useEffect(()=>{
        coinChartData()
    },[days])
    // import { Line } from "react-chartjs-2";

    // const data = {
    //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] =======> X axis pe hai,
    //   datasets: [
    //     {
    //       label: "First dataset line"====>legend hai matlab uss line ka naam ,
    //       data: [33, 53, 85, 41, 44, 65],===>Data jo plot ho ga
    //       fill: true,
    //       backgroundColor: "rgba(75,192,192,0.2)",
    //       borderColor: "rgba(75,192,192,1)"
    //     },
  const myData={
    labels: chartData.map((value)=>{
      const date=new Date(value[0])
      const time= date.getHours()>12 ? `${date.getHours()-12}:${date.getMinutes()}PM` :  `${date.getHours()}:${date.getMinutes()}AM` 
      return days===1?time : date.toLocaleDateString()
    }),
    datasets:[{
      label:`Price in past ${days} days`,
      data: chartData.map((value)=>value[1]) ,
      borderColor: "orange",
      borderWidth:"2"
    }]
  }

  return (
   
    <div className='chart'>
      
     <div className="graphHeading"><h1>Past Trends</h1></div>
      <Line data={myData} options={{elements:{
        point:{radius:1}
      }}} />
    <div className="buttons">
      <button onClick={()=>{setDays(7)}} >7 Days</button>
      <button onClick={()=>{setDays(30)}} >30 Days</button>
      <button onClick={()=>{setDays(365)}} >1 Year</button>
    </div>
    </div>
  )
}

export default CoinChart
