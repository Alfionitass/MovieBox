import React, { Component } from "react";
import {
  
  Container,
  Form,
  // FormControl,
  Row,
  Button,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
// import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';



import "bootstrap/dist/css/bootstrap.min.css";

// const schema = Yup.object().shape({
//   password: Yup.string()
//     .min(5, "Password must be 5 characters at minimum")
//     .required("Password is required"),
//   fullname: Yup.string()
//     .required("Name is required"),
//   // username: Yup.string()
//   //   .required("Username is required"),
// });

export default class FormEditUser extends Component {
  state = {
    token: localStorage.getItem("login"),
    userId: localStorage.getItem("idUser"),
    dataUser: {},
    loading :false,
    username:"",
    fullname:"",
    password:"",
    imagePre: {},
    // loading: false,

    
  };

  componentDidMount = () => {
    this.getCurrentUser();
  };

  tesSumbit = (values) => {
    const { email, username, password, fullname } = values;
    console.log("email", email);
    console.log("username", username);
    console.log("password", password);
    console.log("fullname", fullname);
  }

  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      const fetch = await axios.get("https://nameless-temple-74030.herokuapp.com/user/id", {
        headers: {
          access_token: token,
        },
      });

      // console.log("fetch", fetch);
      this.setState({
        dataUser: fetch.data.User_Data,
        fullname: fetch.data.User_Data.fullname,
        username: fetch.data.User_Data.username,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  onChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const {username, fullname, password, token} = this.state;
    const image = this.state.imagePre.file;
    const email = this.state.dataUser.email;
    // console.log(username, fullname, password, email, image);
    this.setState({
      loading: true,
    })
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('fullname', fullname);
      formData.append('image', image);
      formData.append('password', password);

      console.log("ini form data :", formData);

      const edit = await axios({
        method: "put",
        url: "https://nameless-temple-74030.herokuapp.com/user/update",
        data: formData,
        headers: {
          'access_token' : token,
          'Content-Type': 'multipart/form-data' 
        }
      })
      console.log("success", edit);
      this.setState({
        imagePre: {},
        loading: false,
      })
      Swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: `Success Update`,
        showConfirmButton: false,
        timer: 1500
      }).then(function(){ 
        window.history.back();
        })
    } catch (error) {
      console.log("error meneh", error.response);
      Swal.fire({
        title: "Update failed",
        text: "something went wrong, try again",
        icon: "error",
      });
      this.setState({
        loading: false,
      })
    }

  }

  handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    this.setState({
      imagePre: {
        file: event.currentTarget.files[0],
        url: URL.createObjectURL(file),
      },
    });
  };

  goBack = () => {
    Swal.fire({
      title: "Cancel?",
      text: "All the changes you made are going to lost",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
        
      }
    })
  }
  render() {
    const { image, email } = this.state.dataUser;
    const { username, fullname, imagePre, loading } = this.state
    return (
      <div className="edit-user">
        <Container className="mb-5">
          <h1 className="mt-5 mb-5">Edit User Profile</h1>
            <Row>

            <Col md="3">
              <Image src={imagePre.url ? imagePre.url : `https://nameless-temple-74030.herokuapp.com/${image}`} fluid/>
            </Col>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="3">
                    Email
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={email} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextFullname">
                  <Form.Label column sm="3">
                    Fullname
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="text" placeholder="Fullname" required value={fullname} name="fullname" onChange={this.onChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextUsername">
                  <Form.Label column sm="3">
                    Username
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="text" placeholder="Enter your Username" required value={username} name="username" onChange={this.onChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="profilePicture">
                  <Form.Label column sm="3">
                    Profile Picture
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="file" placeholder="" required onChange={(e) => this.handleFileUpload(e)}/>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    Confirm Password 
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="password" required placeholder="Password" onChange={this.onChange} name="password" />
                  </Col>      
                </Form.Group>
      
                 {
                    loading ? 
                      <Button variant="primary" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                         {"  "}Submitting...
                    </Button>:<Button type="submit">Submit</Button>
                  }

                 <Button className="ml-3" variant="danger" onClick={this.goBack}>Cancel</Button>

              </Form>
            </Col>
            </Row>
        </Container>
      </div>
    );
  }
}
