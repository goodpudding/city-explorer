import axios from 'axios';
import React from 'react';
import City from './City';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: '',
      lat: '',
      lon: '',
      weatherData: {},
    }
  }


  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      cityName: e.target.value
    });
  }
  WeatherRequest = async (e) =>{
    e.preventDefault();
    let weatherReport = await axios.get(`http://localhost:3001/weather?city_name=${this.state.cityName}`)
    console.log(weatherReport);
    this.setState({
      weatherData: weatherReport
    })
  }
  

  citySubmit = async (e) => {
    e.preventDefault();
    try{
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
    this.WeatherRequest(e);
    let latitude= cityData.data[0].lat;
    let longitude= cityData.data[0].lon;
    this.setState({
      lat: latitude,
      lon: longitude,
    },
    )
  } catch (error) {
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.response.status}`
    })
  }
  }

  render() {

   let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`

    return (
      <>
      <div id="box">
        <h1>Data from an API</h1>
          <form onSubmit={this.citySubmit}>
            <label>Pick a City
              <input type="text" onChange={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
        <Weather cityName={this.state.cityName}  weather={this.state.weatherData}/>
       <City cityName={this.state.cityName}  lat={this.state.lat} lon={this.state.lon} mapURL={mapURL}/>
       
       </div>
      </>
    );
  }
}

export default App;