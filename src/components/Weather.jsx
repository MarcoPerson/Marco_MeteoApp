/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react';

function Weather(props) {
    const [country, setCountry] = useState("");
    const [searchCountry, setsearchCountry] = useState("London");
    const [data, setData] = useState({name : "", weather : [""], main : ""});
    const date = new Date();
    const time = date.toLocaleTimeString();
    let emoji = "fa-smog";

    if(data.name){
        if(data.weather.main === "Clouds"){
            emoji = "fa-clouds";
        } else if(data.weather.main === "Rain"){
            emoji = "fa-cloud-shower-heavy";
        } else if(data.weather.main === "Drizzle"){
            emoji = "fa-cloud-rain";
        } else if(data.weather.main === "Snow"){
            emoji = "fa-snow-flake";
        } else if(data.weather.main === "Thunderstorm"){
            emoji = "fa-bolt";
        }
        else{
            emoji = "fa-smog";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setsearchCountry(country);
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCountry}&appid=509ffadf4bdd80ad729e2d568aa63163`);
            const myData = await response.json();
            if(myData.name){
                setData(myData);
            }
        }
        getData();
    }, [searchCountry]);

    return (
        <div>
            <div className="container pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card bg-dark text-white shadow border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="..." />
                            <div class="card-img-overlay text-center">
                                <form onSubmit={ (e) => handleSubmit(e)} className='my-4'>
                                    <div class="input-group mb-3 m-auto" style={{width:300}}>
                                        <input type="text" value={country} class="form-control bg-light fs-5" onChange={(e) => setCountry(e.target.value)} placeholder="Country" aria-label="Country" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <button type='submit' class="input-group-text p-3" id="basic-addon2"><i class="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                </form>
                                <div className="row bg-dark bg-opacity-50 mx-2">
                                    <div className="col-12">
                                        <h3 className='fw-bolder fs-2 pt-3'>{data.name}</h3>
                                        <p>{date.toDateString()}</p>
                                        <p>{time}</p>
                                    </div>
                                </div>
                                <div className="row bg-dark bg-opacity-50 mx-2 mt-2">
                                    <div className="col-12">
                                        <i className={`fa ${emoji} fs-1 pt-3 fw-bolder`}></i>
                                        <p className='fs-2 fw-bolder lead'>{(data.main.temp - 273.15).toFixed(2)}&deg;C</p>
                                        <br />
                                        <br />
                                        <p className='fw-bolder'>{data.weather[0].main} : {data.weather[0].description}</p>
                                        <p className='lead'>{(data.main.temp_min - 273.15).toFixed(2)}&deg;C | {(data.main.temp_max - 273.15).toFixed(2)}&deg;C</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;