
import axios from 'axios';
import React from 'react';
import City from './City';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      error: false,

      errorMessage: "",
      lat: "",
      lon: "",
      weatherData: [],
    };

  }

  citySubmit = (e) => {
    e.preventDefault();

    this.setState(
      {
        cityName: e.target[0].value,
      },
      this.handleCityInput
    );
  };


  handleCityInput = async () => {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;
    try {
      let cityData = await axios.get(url);
      let latitude = cityData.data[0].lat;
      let longitude = cityData.data[0].lon;
      this.setState({
        lat: latitude,
        lon: longitude,
      });
      this.getWeatherInfo();
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`,
      });
    }
  };

  getWeatherInfo = async () => {
    try{

    let weatherURL = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.cityName}`;
    let weatherResponse = (await axios.get(weatherURL)).data;
    console.log(weatherResponse);
    this.setState({
      weatherData: weatherResponse,
    });
  } catch (error){
    this.setState({
      showError: true,
      errorMessage: error.message,
    });
    console.log(error.message);
  }
  };

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`;

    return (
      <>
        <div id="box">
          <h1>Data from an API</h1>
          <form onSubmit={this.citySubmit}>
            <label>
              Pick a City
              <input type="text" onSubmit={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>

          <City
            cityName={this.state.cityName}
            lat={this.state.lat}
            lon={this.state.lon}
            mapURL={mapURL}
          />
        </div>
        <Weather weather={this.state.weatherData} />

      </>
    );
  }
}

export default App;
