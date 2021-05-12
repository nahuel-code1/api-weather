import {useEffect, useState} from 'react'
import axios from 'axios' 
import './App.css'

export default function App() {
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [weatherdata, setweatherdata] = useState();
    let [temp, setTemp] = useState(0);
    let [toggle, setToggle] = useState(true);
    let [units, setUnits] = useState("C°");

    useEffect(() => {
        const fetchApi = async () => {
            navigator.geolocation.getCurrentPosition(position => {
                let dataLatitude = position.coords.latitude;
                setLatitude(dataLatitude);
            
                let dataLongitude = position.coords.longitude;
                setLongitude(dataLongitude);
            });
            const url = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7711b0bc3dff50cf8d0839629484fd23&units=metric`);
            setweatherdata(url.data);
            setTemp(url.data.main.temp);
        }
        fetchApi();
    }, [latitude, longitude])
    
    let iconUrl = "http://openweathermap.org/img/w/" + weatherdata.weather[0].icon + ".png";

    const handleCtoF = () => {
        let changeTemp = (temp * 1.8)  + 32;
        let changeUnit = "F°";
        setTemp(changeTemp);
        setUnits(changeUnit);
    }

    const handleFtoC =  () => {
        let changeTemp = ((temp - 32) * 5) / 9;
        let changeUnit = "C°";
        setTemp(changeTemp);
        setUnits(changeUnit)
    }

    

    return ( 
        <div className="background"> 
            <div className="weather-box">
                <h1 className="text-center">WEATHER APP</h1>
                <h3 className="text-center">{weatherdata.name}, {weatherdata.sys.country}</h3>
                <div className="weather-container">
                    <div className="icon-image">
                        <div className="icon-image_2">
                            <img src={iconUrl} alt="icon weather"/>
                        </div>
                        <div>
                            <h3 className="temp">{temp} {units}</h3>
                        </div>
                    </div>
                    <div className="info-weather">  
                        <div className="info-weather_2">
                            <h3 className="mt-3">"{weatherdata.weather[0].description}"</h3>
                            <h3 className="mt-3">Clouds: {weatherdata.clouds.all}%</h3>
                            <h3 className="mt-3">Wind Speed: {weatherdata.wind.speed} m/s</h3>
                            <h3 className="mt-3">Humedity: {weatherdata.main.humidity}%</h3>
                            <h3 className="mt-3">Pressure: {weatherdata.main.pressure} hPa</h3>
                        </div>
                    </div>
                </div>
                {toggle ? 
                <div className="text-center">
                   <button className="bg-button" onClick={() => {
                       handleCtoF();
                       setToggle(!toggle);
                   }}>Change to farenheit</button>
                </div> 
                :
                <div className="text-center">
                   <button className="bg-button" onClick={() => {
                       handleFtoC();
                       setToggle(!toggle);
                   }}>Change to celcius</button>
                </div>}
            </div>
        </div>
    )
}