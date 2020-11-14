import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
export default class Hero extends Component {
  state = {
    movies: [],
  };
  componentDidMount = () => {
    this.getMovie();
  };

  getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          movies: json.results,
          totRes: json.total_pages,
        });
      });
  };
  render() {
    return (
      <>
        <Carousel>
          {this.state.movies.slice(0, 5).map((bg) => (
            <Carousel.Item key={bg.id}>
              <img
                className="d-block w-100 h-50"
                src={`http://image.tmdb.org/t/p/original${bg.backdrop_path}`}
                alt="First slide"
              />
            </Carousel.Item>
          ))}

          {/* <Carousel.Item>
            <img className="d-block w-100 h-50" src={dp1} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={dp2} alt="Third slide" />
          </Carousel.Item> */}
        </Carousel>
      </>
    );
  }
}
