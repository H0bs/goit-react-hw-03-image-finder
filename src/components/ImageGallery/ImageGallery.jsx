import React, { Component } from "react";
import axios from "axios";
import { ImageGalleryList } from "./ImageGallery.styled"
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import { Button } from "../Button/Button"
import { Spinner } from "../Loader/Loader"
import {Modal} from "../Modal/Modal"

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29676871-837cab832e208c22136e7205d"

export class ImageGallery extends Component {
  state = {
    photos: [],
    page: 1,
    showButton: "hidden",
    showLoader: false,
    showModal: false,
    imageModal: null,
    error: null,
  }

  async componentDidUpdate(prevProps, prevState) {

      // this.setState({ showLoader: true });
      if (prevProps.value !== this.props.value) {
        this.setState({ page: 1, photos: []})
      }
      if (prevProps.value === this.props.value & prevState.page === this.state.page) {
        return console.log('Oooops')
      }
    try {

      console.log(prevState.page)
      console.log(prevState.photos)

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
      this.setState(prevState => {
        return {
          photos: [...prevState.photos, ...response.data.hits]
        }
      })
      console.log(this.state.page)
            console.log(this.state.photos)

      if (this.state.photos !== [] &
        response.data.totalHits > (this.state.photos.length + response.data.hits.length)
        ) {
        this.setState({showButton: "show"})
      } else {
        this.setState({showButton: "hidden"})
      }

    } catch (error) {
      this.setState({ error });
    }
    // finally {
    //   this.setState({ showLoader: false });
    // }
  }  

  changePage = () => {
    this.setState({page: this.state.page +1})
  }
  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }
  imgForModal = ({src, alt}) => {
    this.setState({
      imageModal: { src, alt },
    });
      this.togleModal();
  }

  bildGalleryList = () => {
    return this.state.photos.map(({id, webformatURL, tags, largeImageURL}) => {
      return (
        <GalleryItem
          key={id}
          src={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClickModal={this.imgForModal}
        />
      )
    })
  }

  render() {
    const { photos, showLoader, showButton, showModal , imageModal, error} = this.state;
    const gallery = this.bildGalleryList();

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {showLoader === true && <Spinner />}
        {photos.length !== 0 && <ImageGalleryList>{gallery}</ImageGalleryList>}
        {showButton === "show" && <Button onClick={this.changePage} />}
        {showModal === true && <Modal onClose={this.togleModal}>
          <img src={imageModal.src} alt={imageModal.alt} width={480}/>
        </Modal>}
      </>
    )
  }
}