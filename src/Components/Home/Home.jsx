import React, { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../../Assets/pexels-pixabay-209831.jpg"
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import visibility from "../../Assets/Visibility Icon 1.svg"
import pressure from "../../Assets/pressure-white 1.svg"
export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [val, setVal] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("http://api.weatherapi.com/v1/current.json", {
          params: {
            key: "2598e0981d3a4b579a6142638240107",
            q: city,
          },
        });
        setWeatherData(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(val);
  };
  var percentage = 66;

  return (
    <>
      <div className="container  vh-100">
        <div className="row justify-content-between  align-items-center py-3">
          <h1 className="col-lg-4" style={{color:"#27485b",fontFamily:"ui-monospace"}}>TempTrack</h1>
          <form onSubmit={handleSubmit} className="col-lg-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-primary">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        {/* ////////////////////////////////////////////////
         */}
         <div className="row h-50 bg-black div_img">
         {weatherData && (
                <div className="row justify-content-between">
                <div className="col-lg-6 align-self-end px-5 py-3 d-flex  flex-column  justify-content-center  align-items-baseline">
                
                <img src={weatherData.current.condition.icon} alt="weather condition" width={100} height={100}/>
                <h1 className="text-light" style={{fontSize:"6rem"}}>{weatherData.current.temp_c}°</h1>
                <h4 className="text-light">{weatherData.location.country}</h4>
                </div>
                <div className="col-lg-4 align-self-end px-5 py-3 text-light" style={{textAlign:'center',fontFamily:"serif"}}>
                <h2>{weatherData.location.tz_id}</h2>
                <p>{weatherData.location.localtime}</p>
                
                </div>
            </div>
            )}
         </div>

         {/* ------------------------------------------------------------------- */}
         {weatherData && (
         <div className="row mt-4 justify-content-between">

            <div className="col-lg-4 p-3 rounded-3 hum position-relative d-flex justify-content-between  ">
              {/* <div className=""> */}
            <div className="col-lg-4">

             <h3 className=" " color="rgb(67 91 103)"> Humidity</h3>
            <div style={{ width: 100, height: 100 }}><CircularProgressbar value={weatherData.current.humidity} text={`${weatherData.current.humidity}%`} styles={buildStyles({
                  // // Rotation of path and trail, in number of turns (0-1)
                  // rotation: 0.25,

                  // // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  // strokeLinecap: 'butt',

                  // // Text size
                  // textSize: '16px',

                  // // How long animation takes to go from one percentage to another, in seconds
                  // pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `rgba(45, 48, 55, 0.66)`,
                  textColor: '#000',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}/></div>

            </div>
           {/* ////////////////// */}
            <div className="col-lg-4" >
            <i className="fa-solid fa-wind fs-1"></i>
            <h2 className="py-1">{weatherData.current.wind_kph}km/h</h2>
            <p style={{color:"teal",fontSize:"large"}} >Wind Speed</p>
            </div>
                   
            
            </div> 

          <div className="col-lg-7 col-md-6 col-sm-12 rounded-3 d-flex flex-wrap  justify-content-between">
            <div className="col-lg-3 rounded-3  hum1 p-3">
              <h6>Visibility</h6>
              <div className="row  justify-content-center">
            <img src={visibility} alt="" width={70} height={70} className="text-center my-1"/></div>
              <div className="row">
                <h4>{weatherData.current.vis_km}/km</h4>
              </div>
            </div>
            <div className="col-lg-4 rounded-3 hum1 p-3">
              <h6>UV Index</h6>
              <div className="row  justify-content-center">
              <div

              role="progressbar"
              aria-valuenow={weatherData.current.uv}
              aria-valuemin={0}
              aria-valuemax={10}
              style={{ "--value": weatherData.current.uv,width:"10rem" }}
            ></div>
              </div>
            {/* <p>{weatherData.current.uv}</p> */}
            </div>
            <div className="col-lg-3 rounded-3  hum1 p-3">
              <h6>Pressure</h6>
              <div className="row  justify-content-center">
            <img src={pressure} alt="" width={70} height={70} className="text-center my-1"/></div>
              <div className="row">
                <h4>{weatherData.current.pressure_mb}hPa</h4>
              </div>
            </div>
          </div>
          
          
         
         
         
         
         </div>
 )}
      </div>
    </>
  );
}
