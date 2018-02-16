import React, { Component } from 'react'

export const renderIfHasData = (WrappedComponent) => (
  class Wrapper extends Component {
    render() {
      const data = this.props.children
      return (!data || (Array.isArray(data) && !data.length))
        ? null
        : <WrappedComponent {...this.props} />
    }
  }
)

export default renderIfHasData