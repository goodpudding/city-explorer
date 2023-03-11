import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

// this.title = movieObject.title;
// this.overview = movieObject.overview;
// this.averageVote = movieObject.vote_average;
// this.voteCount = movieObject.vote_count;
// this.imageURL = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
// this.popularity = movieObject.popularity;
// this.releasedOn = movieObject.release_date;
class Movie extends React.Component {
  render() {
    let movieInfo = this.props.movie.map((val, idx) => {
      return (
        <Card style={{ width: "18rem" }} movie={val} key={idx}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{val.title}</Card.Title>
            <Card.Text>{val.overview}</Card.Text>
          </Card.Body>
          <ListGroup className="movieInfo">
            <ListGroup.Item>{val.averageVote}</ListGroup.Item>
            <ListGroup.Item>{val.voteCount}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <ListGroup.Item>{val.popularity}</ListGroup.Item>
            <ListGroup.Item>{val.releasedOn}</ListGroup.Item>
          </Card.Body>
        </Card>
      );
    });

    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Header>Weather Forecast</Card.Header>
            {movieInfo}
          </Card.Body>
        </Card>
      </>
    );
  }
  }
  

export default Movie;
