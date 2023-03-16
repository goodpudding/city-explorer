import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

class Movies extends React.Component {
  render() {
    let movieList = [];
    if (this.props.movies) {
      movieList = this.props.movies.map((val, idx) => {
        return (
          <Movie key = {idx} movieTitle = {val.title} overview = {val.overview} imgURL = {val.image_url} averageVote = {val.averageVote} voteCount={val.voteCount} popularity={val.popularity} releasedOn = {val.releasedOn}/>
        );
      });
    } else {
      movieList.push(
      );
    }
    return (
      <>
        <h3>Movies</h3>
        {movieList}
      </>
    )
  }
}
class Movie extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem" }} >
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{this.props.movieTitle}</Card.Title>
          <Card.Img variant="top" src={this.props.imgURL} />
          <Card.Text>{this.props.overview}</Card.Text>
        </Card.Body>
        <ListGroup className="movieInfo">
          <ListGroup.Item>{this.props.averageVote}</ListGroup.Item>
          <ListGroup.Item>{this.props.voteCount}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <ListGroup.Item>{this.props.popularity}</ListGroup.Item>
          <ListGroup.Item>{this.props.releasedOn}</ListGroup.Item>
        </Card.Body>
      </Card>
    );
  }
}

export default Movies;
