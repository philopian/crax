import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.styl'

class ___titleCase___ extends Component {
  render () {
    const { message } = this.props
    return (
      <div className={`${styles.helloText}`}>
        <h3>Hello class base component!</h3>
        <p>{message}</p>
      </div>
    )
  }
}

___titleCase___.propTypes = {
  /** custom message for this component */
  message: PropTypes.string
}

___titleCase___.defaultProps = {
  message: '...'
}

export default ___titleCase___
