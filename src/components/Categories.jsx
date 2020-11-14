import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import noimg from "../assets/img/noimg.png";
import qs from "qs";

export default class Categories extends Component {
  state = {
    movies: [],
    option: "all",
    active: "all",
    // genre: [],
    currPage: 1,
    totRes: 0,
  };

  getMovie = async () => {
    const {currPage, option} = this.state;
    const body = qs.stringify({
      category: option,
    }); 

    console.log(body);
    try {

      if (option === "all") {
        const comeToPapa = await axios.get(`https://nameless-temple-74030.herokuapp.com/home/${currPage}`);
        console.log(comeToPapa.data);
        this.setState({
          movies: comeToPapa.data.document,
          totRes: comeToPapa.data.total_pages,
        })
      } else {
        console.log("masuk categoy");
        const comeToPapa = await axios.get(`https://nameless-temple-74030.herokuapp.com/movie/category/${option}`);

        console.log(comeToPapa.data);
        this.setState({
          movies: comeToPapa.data,
          totRes: comeToPapa.data.total_pages,
        })
      }

    } catch (error) {
      console.log("error get movie", error.response);
    }
  }

  componentDidMount = () => {
    this.getMovie();
    // this.getGenre();
  };
// get movie yg lama
  // getMovie = () => {
  //   const { option } = this.state;
  //   if (option === 0) {
  //     console.log("masuk option");
  //     fetch(
  //       "https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac"
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         this.setState({
  //           movies: json.results,
  //           totRes: json.total_pages,
  //         });
  //       });
  //   } else {
  //     console.log("masuk option custom");
      // fetch(
      //   `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}`
      // )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         this.setState({
  //           movies: json.results,
  //           totRes: json.total_pages,
  //         });
  //       });
  //   }
  // };

  //INI TETEP DITULIS PREVPROPSNYA MESKIPUN GA DIPAKE
  
  componentDidUpdate = (prevProps, prevState) => {
    const { option } = this.state;
    if (option !== prevState.option) {
      this.getMovie();
    }
  };

  genre = (genre) => {
    this.setState({
      option: genre,
      active: genre,
      currPage: 1,
    });
  };

  // getGenre = () => {
  //   fetch(
  //     `https://api.themoviedb.org/3/genre/movie/list?api_key=0f4cb6189e20110c05e4b524ae7821ac`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({
  //         genre: json.genres,
  //       });
  //     });
  // };

    paginate = async (pageNum) => {
      try {
        const res = await axios.get(`https://nameless-temple-74030.herokuapp.com/home/${pageNum}`);
        this.setState({
          movies: res.data.document,
          currPage: pageNum,
        });
        window.scrollTo(0, 700)
      } catch (error) {
        console.log("error ini paginatenya", error);
      }
    } 

  // fungsi pagination buat ngubah page result dari fetch
  // paginate = async (pageNum) => {
  //   const { option } = this.state;
  //   try {
  //     const data = await axios.get(
  //       option === 0
  //         ? `https://api.themoviedb.org/3/movie/popular?api_key=0f4cb6189e20110c05e4b524ae7821ac&page=${pageNum}`
  //         : `https://api.themoviedb.org/3/discover/movie?api_key=0f4cb6189e20110c05e4b524ae7821ac&with_genres=${option}&page=${pageNum}`
  //     );
  //     this.setState({
  //       movies: data.data.results,
  //       currPage: pageNum,
  //     });
  //     window.scrollTo(0, 700);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };
  
  firstPagi = async () => {
    this.paginate(1);
  };

  lastPagi = async () => {
    const { totRes } = this.state;
    this.paginate(totRes);
  };

  render() {
    const { active, totRes, currPage } = this.state;
    return (
      <Container>
        <div className="show-by">
          <h1>Show by Genre</h1>
          <Button
            onClick={() => this.genre("all")}
            className={active === "all" ? `aktip` : ""}
          >
            All Genre
          </Button>
          <Button
            onClick={() => this.genre("Action")}
            className={active === "Action" ? `aktip` : ""}
          >
            Action
          </Button>
          <Button
            onClick={() => this.genre("Drama")}
            className={active === "Drama" ? `aktip` : ""}
          >
            Drama
          </Button>
          <Button
            onClick={() => this.genre("Comedy")}
            className={active === "Comedy" ? `aktip` : ""}
          >
            Comedy
          </Button>
          <Button
            onClick={() => this.genre("Musical")}
            className={active === "Musical" ? `aktip` : ""}
          >
            Musical
          </Button>
          <Button
            onClick={() => this.genre("Horror")}
            className={active === "Horror" ? `aktip` : ""}
          >
            Horror
          </Button>
          <Button
            onClick={() => this.genre("Western")}
            className={active === "Western" ? `aktip` : ""}
          >
            Western
          </Button>
          <Button
            onClick={() => this.genre("History")}
            className={active === "History" ? `aktip` : ""}
          >
            History
          </Button>
          <Button
            onClick={() => this.genre("Fantasy")}
            className={active === "Fantasy" ? `aktip` : ""}
          >
            Fantasy
          </Button>
          <Button
            onClick={() => this.genre("Animation")}
            className={active === "Animation" ? `aktip` : ""}
          >
            Animation
          </Button>
        </div>
        <div className="movie-by-genre">
          <Row>
            {this.state.movies ? (
              this.state.movies.map((mov) => (
                <Col md="3" key={mov.id}>
                  <Link to={`/detail/${mov.id}/overview`}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={
                          mov.poster
                            ? mov.poster
                            : noimg
                        }
                        alt="movie poster"
                      />
                      <Card.Body>
                        <Card.Title>{mov.title}</Card.Title>
                        <Card.Text>{mov.release_date?.slice(0, 4)}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Col>
                <Card>
                  <Card.Img variant="top" src="../assets/img/404.jpg" />
                  <Card.Body>
                    <Card.Title>No Movie Found</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </div>
        {totRes && (
          <Row id="page">
            <Pagination>
              <Pagination.First
                onClick={() => this.paginate(1)}
                className={currPage === 1 && "disabled"} // tambahin class name disable kalo lagi di pagination  pertama biar ga bisa diklik
              />
              <Pagination.Prev
                onClick={() => this.paginate(currPage - 1)}
                className={currPage === 1 && "disabled"}
              />
              {currPage && (
                <Pagination.Item active>
                  Page {currPage} of {totRes}
                </Pagination.Item>
              )}

              <Pagination.Next
                onClick={() => this.paginate(currPage + 1)}
                className={currPage === totRes && "disabled"}
              />
              <Pagination.Last
                onClick={() => this.paginate(totRes)}
                className={currPage === totRes && "disabled"}
              />
            </Pagination>
          </Row>
        )}
      </Container>
    );
  }
}
