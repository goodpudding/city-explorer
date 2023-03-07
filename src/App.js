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
    });
  }

  citySubmit = async (e) => {
    e.preventDefault();
    try{
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
    let latitude= cityData.data[0].lat;
    let longitude= cityData.data[0].lon;
    this.setState({
      lat: latitude,
      lon: longitude,
    })
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
       <City cityName={this.state.cityName}  lat={this.state.lat} lon={this.state.lon} mapURL={mapURL}/>
       </div>
      </>
    );
  }
}

export default App;