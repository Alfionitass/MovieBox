import React, { Component } from "react";
import axios from "axios";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import qs from "qs";

export default class Review extends Component {
  state = {
    review: "",
    ratings: 0,
    // reviewee: [],
    reviews: [],
    token: localStorage.getItem("login"),
    username: localStorage.getItem("username"),
    userid: localStorage.getItem("idUser")
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.reviewee !== prevState.reviewee) {
  //     this.render();
  //   }
  // };

  componentDidMount = () => {
    this.getReview()
  }

  getReview = async () => {
    try {
      const id = this.props.movie.id;
      console.log(id, this.state.token, "tes");
      const gimmeReview = await axios({
        method: "get",
        url: `https://nameless-temple-74030.herokuapp.com/review/movie/${id}`,
        headers: {
          "access_token": this.state.token,
        },
      })
      console.log("fetch",gimmeReview.data);
      this.setState({
        reviews: gimmeReview.data,
      })
    } catch (error) {
      console.log("error", error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.movie.id;
    const { review, ratings, token } = this.state;
    if (review === "" || ratings === 0) {
      Swal.fire({
        position: 'top-mid',
        icon: 'error',
        title: `Rating and Review cannot be null!`,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      const body = qs.stringify({
        comment: review,
        rating: ratings
      })
  
      try {
        const postReview = await axios({
            method: "post",
            url: `https://nameless-temple-74030.herokuapp.com/review/add/${id}`,
            data: body,
            headers: {
              "access_token": token,
              "content-Type": "application/x-www-form-urlencoded",
            },
          });
  
          console.log(postReview.data);
          Swal.fire({
            position: 'top-mid',
            icon: 'success',
            title: `Added review`,
            showConfirmButton: false,
            timer: 15000
          }).then(

            window.location.reload()
          )
  
  
        
      } catch (error) {
        // console.log("review error", error.response.data.msg);
        Swal.fire({
          position: 'top-mid',
            icon: 'error',
            title: error.response.data.msg,
            showConfirmButton: false,
            timer: 1500
        })
      }
    }
  
  }
      
  deleteReview = () => {

  }

  handleStar = (rating) => {
    this.setState({ ratings: rating });
  };

  handleChange = (e) => {
    this.setState({ review: e.target.value });
  };


  render() {
    const { review, ratings, reviews, token, username, userid} = this.state;
    // const { reviews, token, username } = this.state;

    return (
      <div className="content-badge">
        <div className="review mt-5 mb-5">
        {token ? (
          <Row>
            <Col lg="12">
              <b>{username}</b>
              <ReactStars
                count={5}
                size={20}
                color2={"#ffd700"}
                onChange={this.handleStar}
                value={ratings}
              />
              <InputGroup>
                <FormControl
                  placeholder="Leave a review"
                  value={review}
                  onChange={this.handleChange}
                />
              </InputGroup>
              <Button
                className="send"
                type="button"
                size="sm"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>

              {reviews.length ? (
                <Col mb="5">
                  {reviews.reverse().map((review) => (
                    <div className="border" key={review.userId}> 
                      <Col lg="10 mt-3" >
                          <b>{review.user ? review.user.fullname : "No user review"}</b>
                          <p>{review.comment ? review.comment : "No review yet"}</p>
                          <p>Rating: {review.rating ? review.rating : "N/A"} </p>
                        </Col>
                        {review.userId == userid && (
                          <Button className="align-self-end" onClick={() => this.deleteReview()}>Delete</Button>
                        )}
                    </div>
                  ))}
                </Col>
              ) : "Review not found in this movie" }
            </Row>
          ) : "Login to add review of this movie"}
{/* 
          <div className="load-more">
            <Button size="sm">
              Load More
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
}
