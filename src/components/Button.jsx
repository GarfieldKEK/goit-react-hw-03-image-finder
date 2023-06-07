import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
