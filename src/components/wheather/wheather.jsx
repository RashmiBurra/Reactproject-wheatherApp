import React, { useState } from 'react'
import "./wheather.css"
import Icon from './icon.jpeg';
const Wheather=()=> {
    const [city,setCity]=useState("");
  const [result,setResult]=useState("");
  const [error, setError] = useState("");
    const changeHandler=e=>{
        setCity(e.target.value);
    }
    
    const getTemp= async()=>{
       const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f677bacdc14f9aabfe80480a15e12ba3`,{method:"GET"});
       if (response.ok) {
        const data = await response.json();
        const kelvin = data.main.temp;
        const celsius = kelvin - 272.15;
        setResult(`Temperature in ${city}:"${Math.round(celsius)}°C"`);
        setError("");
    } else {
        setResult("");
        setError(`City "${city}" not found!`);
    }
    setCity("");
}

    
    const submitHandler=e=>{
        e.preventDefault();
        console.log(city);
        getTemp();
        
    }
  return (
        <center>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"0.5rem"}}><h1>Wheather App</h1>  
           <img src={Icon} style={{height:"50px",width:"50px",borderRadius:"10px"}}/></div>
        <form onSubmit={submitHandler}><label for="city" style={{fontSize:"2rem",marginRight:"1rem"}}>City:</label>
  <input type="text" id="city" name="city" value={city} placeholder="Enter city name" onChange={changeHandler} style={{height:"2rem",width:"10rem",borderRadius:"0.5rem"}}/>
  <br/><br/>
  <input type="submit" value="Get Temperature" style={{backgroundColor:"yellow",height:"2rem",borderRadius:"0.5rem",cursor:"pointer",border:"none"}}/>
  </form>
  <h3>{error}</h3>
  <h3 >{result}</h3>
  </center>
  )
}

export default Wheather