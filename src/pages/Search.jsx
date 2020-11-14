import React, { Component } from "react";
import Searched from "../components/Searched";

export default class Search extends Component {
  render() {
    const keyword = this.props.match.params.keyword;
    return <Searched keyword={keyword} />;
  }
}
