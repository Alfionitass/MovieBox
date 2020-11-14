import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import noimg from "../assets/img/girl.jpg";

export default class Character extends Component {
  state = {
    casts: [],
    token: localStorage.getItem("login"),
  };

  componentDidMount = () => {
    this.getChar()
  }

  getChar = async () => {
    try {
      const id = this.props.movie.id;
      console.log(id, this.state.token, "tes");
      const gimmeChar = await axios({
        method: "get",
        url: `https://nameless-temple-74030.herokuapp.com/moviechar/find/${id}`,
        headers: {
          "access_token": this.state.token,
        },
      })
      console.log(gimmeChar.data);
      this.setState({
        casts: gimmeChar.data.characters,
      })
    } catch (error) {
      console.log("error", error);
    }
  };


  render() {
    // console.log(this.props.movie);
    const { casts, token } = this.state;
    return (
      <div className="main-char">
        <div className="character mt-5">
          {token ? (
             <Row>
             {casts.length ? (
               <Col md="2">
                 {casts.map((char) => (
                  <Card>
                    <Card.Img
                      variant="top"
                      src={char.image ? (`https://nameless-temple-74030.herokuapp.com/${char.image}`) : noimg}
                    />
                    <Card.Body>
                      <Card.Title>{char.name ? char.name : "Unknown Artist"}</Card.Title>
                    </Card.Body>
                  </Card>

                 ))}
             </Col>
             ) : "No Characters found in this movie"}
               
           </Row>
          ) : "Login to view cast's of this movie"}
         
        </div>
      </div>
    );
  }
}
