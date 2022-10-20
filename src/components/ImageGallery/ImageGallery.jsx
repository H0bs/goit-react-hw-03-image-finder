import React, { Component } from "react";
import axios from "axios";
import { ImageGalleryList } from "./ImageGallery.styled"
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import {Button} from "../Button/Button"

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29676871-837cab832e208c22136e7205d"

export class ImageGallery extends Component {
  state = {
    photos: [],
    page: 1,
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({page: 1})
    }

    try {
      if (prevProps.value === this.props.value &
        prevState.page === this.state.page) {
        return
      }
      const response = await axios.get(``, {
        params: {
          q: this.props.value,
          page: this.state.page,
          key: `${ KEY }`,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12
        }
      })
      this.setState({ photos: response.data.hits })
      console.log(response.data.hits)

    } catch (error) {
      console.log(error);
    }
  }  

  bildGalleryList = () => {
    return this.state.photos.map(photo => {
      return (
        <GalleryItem
          key={photo.id}
          src={photo.webformatURL}
        />
      )
    })
  }
  
  changePage = () => {
    this.setState({page: this.state.page +1})
  }

  render() {
    const gallery = this.bildGalleryList();

    return (
      <div>
        <ImageGalleryList >
          {gallery}
        </ImageGalleryList>
        <Button onClick={this.changePage} />
      </div>
    )
  }
}



  // async componentDidMount() {
  //   try {
  //     const response = await axios.get(``, {
  //       params: {
  //         page: this.state.page,
  //         key: `${ KEY }`,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //         per_page: 12
  //       }
  //     })
  //     console.log(response.data.hits)
  //     this.setState({ photos: response.data.hits })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }