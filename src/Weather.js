import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

class Weather extends React.Component {
  render() {
    
    let weatherData = this.props.weather.data.map((day) => {
      return (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Header>{this.props.cityName}</Card.Header>
            <
          </Card>
        </>
      );
    });
    return {weatherData};
  } 
}

export default Weather;
