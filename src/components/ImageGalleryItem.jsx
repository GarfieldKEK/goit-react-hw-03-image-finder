import React from 'react';
import PropTypes from 'prop-types';
import style from "./styles.modal.css"
const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL } = image;

  return (
    <li className={style.ImageGalleryItem} onClick={() => onClick(image)}>
      <img src={webformatURL} alt="" className={style.ImageGalleryItemimage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
