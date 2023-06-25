import React from 'react';
import PropTypes from 'prop-types';
import style from "./styles.modal.css"
const ImageGallery = ({ children }) => {
  return <ul className={style.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
