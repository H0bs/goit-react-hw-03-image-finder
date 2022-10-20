import {ImageGalleryItem, ImageGalleryItemImage} from './ImageGalleryItem.styled'

export const GalleryItem = ({id, src}) => {
  return (
    <ImageGalleryItem
      id={id}
    >
    <ImageGalleryItemImage src={src} alt="" />
    </ImageGalleryItem>
  )
}
