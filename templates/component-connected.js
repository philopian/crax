import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Wrapper } from "./styles.js";

export class ___titleCase___ extends Component {
  state = {};

  render() {
    const { message } = this.props;
    return (
      <Wrapper>
        <h1>Hello Connected Component</h1>
        <p>{message}</p>
      </Wrapper>
    );
  }
}

___titleCase___.propTypes = {
  message: PropTypes.string
};
const mapStateToProps = state => ({
  //   someStoreProp: state.map.someStoreProp
});
const mapDispatchToProps = dispatch => ({
  //   someActionCreator: x => dispatch(someActionCreator(x))
});
export default connect(mapStateToProps, mapDispatchToProps)(___titleCase___);
