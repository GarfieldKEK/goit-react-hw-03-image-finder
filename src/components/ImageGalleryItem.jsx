import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  const { id, webformatURL } = image;

  return (
    <li className="gallery-item" onClick={() => onClick(image)}>
      <img src={webformatURL} alt="" />
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
