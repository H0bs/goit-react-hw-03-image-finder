import React, { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery"
import { Container } from "./App.styled";


export class App extends Component {
  state = {
    inputValue: "",
  }

  onSubmit = e => {
    this.setState({ inputValue: e })
  }

  render() {

    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery value={ this.state.inputValue} />
      </Container>
    )
  }
}