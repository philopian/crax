import React, { useState } from "react";
import PropTypes from "prop-types";

function ___titleCase___({ message }) {
  const [time, setTime] = useState("");

  const onClick = () => {
    const date = new Date();
    setTime(date.toString());
  };

  return (
    <div>
      <h1>Hello Hook component!</h1>
      <p>{message}</p>

      <button onClick={onClick}>Get time</button>
      <div>{time}</div>
    </div>
  );
}

___titleCase___.propTypes = {
  /** custom message for this component */
  message: PropTypes.string
};

___titleCase___.defaultProps = {
  message: "..."
};

export default ___titleCase___;
