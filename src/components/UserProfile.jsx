import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import imag from "../assets/img/noimg.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default class UserProfile extends Component {
  state = {
    token: localStorage.getItem("login"),
    userId: localStorage.getItem("idUser"),
    dataUser: {},
  };

  componentDidMount = () => {
    this.getCurrentUser();
  };

  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      const fetch = await axios.get("https://nameless-temple-74030.herokuapp.com/user/id", {
        headers: {
          access_token: token,
        },
      });

      console.log("fetch", fetch);
      this.setState({
        dataUser: fetch.data.User_Data,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  render() {
    const { username, image, fullname, email } = this.state.dataUser;
    return (
      <div className="user">
        <Container className="mb-5">
          <h1 className="mt-5 mb-5">User Profile</h1>
          <Row>
            <Col md={4}>
              {image ? <Image src={`https://nameless-temple-74030.herokuapp.com/${image}`} alt="image profile" fluid /> : <Image src={imag} alt="image profile" fluid />
            }
            </Col>
            <Col>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Fullname</b>
                </Col>
                <Col>: {fullname}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Username</b>
                </Col>
                <Col>: {username}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={2}>
                  <b>Email</b>
                </Col>
                <Col>: {email}</Col>
              </Row>
              <Link to="/user/edit">
                <Button className="mt-3">Edit profile</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
