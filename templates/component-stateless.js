import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.___styles___";

const ___titleCase___ = ({ message }) => (
  <div className={`${styles.helloText}`}>
    <h1>Hello Stateless component!</h1>
    <p>{message}</p>
  </div>
);

___titleCase___.propTypes = {
  /** custom message for this component */
  message: PropTypes.string
};

___titleCase___.defaultProps = {
  message: "..."
};

export default ___titleCase___;
