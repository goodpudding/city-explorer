import axios from 'axios';
import React from 'react';
import City from './City';
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
    }
  }


  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      cityName: e.target.value
      // cityData: this.cityData.data[0],
      // cityCoordinates:(this.cityData.data[0].lat, this.cityData.data[0].lon),
    
    });
  }

  citySubmit = async () => {
    // what city are we searching for — the one in state
    // get data from the Location IQ API
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
    let latitude= cityData.data[0].lat;
    let longitude= cityData.data[0].lon;
    this.setState({
      lat: latitude,
      lon: longitude,
    })

    // save that data in state
  }

  render() {

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`

    console.log(mapURL);
    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.citySubmit}>
          <label>Pick a City
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>
       <City cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon} mapURL={mapURL}/>
      </>
    );
  }
}

export default App;