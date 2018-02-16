import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

export const fetching = (WrappedComponent) => (
  class Wrapper extends Component {
    render() {
      const { fetching, ...props } = this.props
      return (fetching)
        ? <CircularProgress />
        : <WrappedComponent {...props} />
    }
  }
)

export default fetching
