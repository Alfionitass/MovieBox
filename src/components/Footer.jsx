import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import gp from "../assets/img/google_play.png";
import as from "../assets/img/apple_store.png";
import tw from "../assets/img/twitter.png";
import f from "../assets/img/facebook.png";
import i from "../assets/img/instagram.png";
import logo from "../assets/img/txtsplash.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="top">
          <div className="name">
            <Image src={logo} />
            <p>Moviebox is free video on demand service that provides streaming of your favorite movies and dramas that you can watch anywhere and anytime. </p>
          </div>
          <div className="about">
            <Link to="/">About Us</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Service</Link>
            <Link to="/">Career</Link>
            <Link to="/">Media Center</Link>
          </div>
          <div className="images">
            <div className="download">
              <h5>Download</h5>
              <div className="download-app">
                <Link to="/"><Image src={gp} /></Link>
                <Link to="/"><Image className="iphone" src={as} /></Link>
              </div>
            </div>
            <div className="sosmed">
              <h5>Social Media</h5>
              <Link to="/"><Image src={tw} /></Link>
              <Link to="/"><Image src={f} /></Link>
              <Link to="/"><Image src={i} /></Link>
            </div>
          </div>
        </div>
        {/* <hr className="my-1" /> */}
        <div className="copy">
          <h6>Copyright 2020 by Team D</h6>
        </div>
      </div>

    );
  }
}
