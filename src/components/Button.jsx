import React from 'react';
import PropTypes from 'prop-types';
import style from "./styles.module.css"

const Button = ({ onClick, children }) => {
  return (
    <button className={style.Button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
