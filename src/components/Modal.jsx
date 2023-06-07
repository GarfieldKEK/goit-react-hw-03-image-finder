import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ image, onClose }) => {
  const { largeImageURL } = image;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
