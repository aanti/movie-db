import React, { Component } from 'react'
import PropTypes from 'prop-types'

const status = {
  initial: {
    fetching: false,
    downloaded: false,
    error: false
  },
  fetching: {
    fetching: true,
    downloaded: false,
    error: false
  },
  error: {
    fetching: false,
    downloaded: false,
    error: true
  },
  downloaded: {
    fetching: false,
    downloaded: true,
    error: false
  }
}


const fetchingData = (WrappedComponent) => (
  class Wrapper extends Component {
    constructor () {
      super()
      this.state = {
        ...status.initial,
        data: []
      }
    }

    render() {
      const { fetch, ...props } = this.props
      return <WrappedComponent {...props} />
    }
  }
)