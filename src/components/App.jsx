import React, { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery"

export class App extends Component {
  state = {
    inputValue: "",
  }

  onSubmit = e => {
    this.setState({ inputValue: e })
    console.log(this.state.inputValue)
  }

  render() {

    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery value={ this.state.inputValue} />
      </div>
    )
  }
}