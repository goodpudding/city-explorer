import Card from "react-bootstrap/Card";
import React from "react";

class Weather extends React.Component {
  render() {
    let forecast = this.props.weather.map((day, idx) => {
      return (
        <Card.Text date={day} key={idx}>
          {day.todaysDate}:
           Low of {day.low} °C, high of {day.high} C° with
           {day.todaysDescription}
        </Card.Text>
      );
    });


    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Header>Weather Forecast</Card.Header>
            {forecast}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Weather;
