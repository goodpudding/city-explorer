import axios from "axios";
import React from "react";
import Weather from "./Weather";
import Movies from "./Movies";
import "bootstrap/dist/css/bootstrap.css";
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
      movieData: [],
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

  getAPIs() {
    this.getWeatherInfo();
    this.getMovieInfo();
  }

  handleCityInput = async () => {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;
    try {
      let cityData = await axios.get(url);
      let latitude = cityData.data[0].lat;
      let longitude = cityData.data[0].lon;
      this.setState(
        {
          lat: latitude,
          lon: longitude,
        },
        this.getAPIs
      );
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`,
      });
    }
  };

  getWeatherInfo = async () => {
    try {
      let lat = this.state.lat;
      let lon = this.state.lon;
      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?&lat=${lat}&lon=${lon}`;
      let weatherResponse = (await axios.get(weatherURL)).data;
      this.setState({
        weatherData: weatherResponse,
      });
    } catch (error) {
      this.setState({
        showError: true,
        errorMessage: error.message,
      });
      console.log(error.message);
    }
  };

  getMovieInfo = async () => {
    try {
      let cityName = this.state.cityName;
      let movieURL = `${process.env.REACT_APP_SERVER}/movies?cityName=${cityName}`;
      let movieResponse = (await axios.get(movieURL)).data;
      this.setState({ movieData: movieResponse });
    } catch (error) {
      this.setState({
        showError: true,
        errorMessage: error.message,
      });
    }
  };

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`;

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
        <Movies movies={this.state.movieData} />

      </>
    );
  }
}
class City extends React.Component{

  render(){
    return(
      <>
        <p>{this.props.cityName}</p>
        <p>{this.props.lat}</p>
        <p>{this.props.lon}</p>
        <img src={this.props.mapURL} alt={this.props.cityName}/>
      </>
    );
  }
}
export default App;
