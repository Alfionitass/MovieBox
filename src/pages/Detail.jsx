import React, { Component } from "react";
import DetailMovie from "../components/DetailMovie";
//import Overview from "../components/Overview";

export default class Detail extends Component {
  render() {
    window.scrollTo(0, 0);

    return (
      <div>
        <DetailMovie />
        {/* <Overview /> */}
      </div>
    );
  }
}
