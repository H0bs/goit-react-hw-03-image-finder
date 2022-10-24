import propTypes from 'prop-types';
import { ImageGalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({src, tags, largeImageURL, onClickModal}) => {
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        src={src}
        alt={tags}
        onClick={() => onClickModal({src: largeImageURL, alt: tags })}
      />
    </ImageGalleryItem>
  )
}

GalleryItem.propTypes = {
  id: propTypes.string,
  src: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
  onClickModal: propTypes.func.isRequired,
}