import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import { Container, Card, Pagination, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Searched extends Component {
  state = {
    movies: [],
    currPage: 1,
    totRes: 0,
  };

  getMovie = async () => {
    const { keyword } = this.props;
    const body = qs.stringify({
      search: keyword,
    })
    try {
      const movie = await axios({
        method: "post",
        url: `https://nameless-temple-74030.herokuapp.com/search`,
        data: body,
        header : "application/x-www-form-urlencoded",
        
      });

      // console.log(movie);

      this.setState({
        movies: movie.data,
        // totRes: movie.data.total_pages,
      });
    } catch (error) {
      console.log("error", error.response);
    }
  };

  componentDidMount = () => {
    this.getMovie();
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("inijalna");
    const { keyword } = this.props;
    if (keyword !== prevProps.keyword) {
      if (keyword) {
        this.getMovie();
        this.setState({ currPage: 1 });
      }
    }
  };

  paginate = (pageNum) => {
    this.setState({ currPage: pageNum });
    this.getMovie(pageNum);
    window.scrollTo(0, 0);
  };
  render() {
    const { keyword } = this.props;
    const { movies, currPage, totRes } = this.state;
    return (
      <div className="search">
        <Container className="mt-5 mb-5">
          <h1 className="mb-5">You Are Searching for "{keyword}" </h1>
          <Row>
            {movies.length ? (
              movies.map((mov) => (
                <Col lg="3">
                  <Link to={`/detail/${mov.id}/overview`}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={
                          mov.poster
                            ? mov.poster
                            : "noImg"
                        }
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
                <h3 className="search-msg">Sorry, No movie found yet :(</h3>
              </Col>
            )}
          </Row>
          {movies.length ? (
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
              {/* <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{14}</Pagination.Item> */}
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
          ): <div className="mb-5"></div>}
        </Container>
      </div>
    );
  }
}
