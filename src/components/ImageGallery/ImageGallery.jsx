import React, { Component } from "react";
import { ImageGalleryList } from "./ImageGallery.styled"
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import { Button } from "../Button/Button"
import { Spinner } from "../Loader/Loader"
import { Modal } from "../Modal/Modal"
import {fetchPhotos} from "../api/api"

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
    const prevValue = prevProps.value;
    const nextValue = this.props.value;
    const nextPage = this.state.page;
    const { photos } = this.state;
      
    if (prevValue !== nextValue) {
      this.setState({ page: 1, photos: []})
    }

    if ((prevValue === nextValue & prevState.page === nextPage) || (
      prevValue !== nextValue & nextPage !== 1)) {
      return
    }

    try {
      this.setState({ showLoader: true });

      const response = await fetchPhotos(nextValue, nextPage);

      this.setState(prevState => {
        return {
          photos: [...prevState.photos, ...response.data.hits],
          showLoader: false,
        }
      })

      if (photos !== [] &
        response.data.totalHits > (photos.length + response.data.hits.length)
        ) {
        this.setState({showButton: "show"})
      } else {
        this.setState({showButton: "hidden"})
      }
    } catch (error) {
      this.setState({ error });
    }
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
          <img src={imageModal.src} alt={imageModal.alt} width={960}/>
        </Modal>}
      </>
    )
  }
}
