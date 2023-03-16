import React from "react";
import Card from "react-bootstrap/Card";
class Weather extends React.Component {
  render() {
    let forecast = [];
    if (this.props.weather) {
      forecast = this.props.weather.map((weather, idx) => {
        return (
          <WeatherDay key = {idx} weatherDate = {weather.todaysDate} description = {weather.todaysDescription} low = {weather.low} high = {weather.high} />
        );
      });
    } else {
      forecast.push(

      );
    }
    return (
      <>
        <h3>Forecast</h3>
        {forecast}
      </>
    )
  }
}

class WeatherDay extends React.Component {
  render() {
    return (
      <>      
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Header>Weather Forecast</Card.Header>
            <Card.Text>
            {this.props.weatherDate}: Low of {this.props.low} °C, high of {this.props.high} C° with
             {this.props.description}
          </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Weather;
