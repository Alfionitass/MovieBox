import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";

class Overview extends Component {
  state = {
    crews:[]
  }

  // componentDidMount = async () => {
  //   try {
  //     const { crew } = this.state;
  //     const id = this.props.movie.id;
  //     const fetch = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0f4cb6189e20110c05e4b524ae7821ac`
  //     );

  //     console.log("fetch", fetch);
  //     this.setState({
  //       crews: fetch.data.crew,
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

    render() {
      const { synopsis, release_date, category, director, featured_song, budget } = this.props.movie
      // const { job, name } = this.state.crews;
      //const { crews } = this.state;

        return (
          <div className="trailer">
            <div className="synopsis">
              <h1>Synopsis</h1>
              <p>{synopsis ? synopsis : "Not Found"}</p>
            </div>

            <div className="movie-info">
              <h1>Movie Info</h1>
              <Row>
                <Col lg="2">
                  <b>Release Date</b>
                </Col>
                <Col lg="10">: {release_date ? release_date : "Not Found"} </Col>

                <Col lg="2">
                  <b>Director</b>
                </Col>
                <Col lg="10">: {director ? director : "Not Found"} </Col>

                <Col lg="2">
                  <b>Category</b>
                </Col>
                <Col lg="10">: {category ? category : "Not Found"} </Col>

                <Col lg="2">
                  <b>Featured Song</b>
                </Col>
                <Col lg="10">: {featured_song ? featured_song : "Song Not Found"} </Col>

                <Col lg="2">
                  <b>Budget</b>
                </Col>
                <Col lg="10">: {budget ? budget : "Not Found"} </Col>
              </Row>
            </div>
          </div>
        )
    }
}

export default withRouter(Overview);
