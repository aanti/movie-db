import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MainSection from './components/MainSection/MainSection'

import muiTheme from './theme/theme'
import { search, getMovie } from './api'

function debounce(func, wait, immediate) {
  let timeout
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const statusState = {
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

class App extends Component {
  constructor () {
    super()

    this.state = {
      searchText: '',
      status: {
        autocomplete: statusState.initial,
        details: statusState.initial,
        list: statusState.initial
      },
      result: [],
      details: null,
      page: 1,
      isMore: true
    }

    this.handleSearch = debounce(this.handleSearch.bind(this), 250)
    this.handleClear = this.handleClear.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleDetailsClose = this.handleDetailsClose.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleClear () {
    this.setState({ page: 1, isMore: true, searchText: '' })
  }

  handleDetailsClose () {
    this.setState({ details: null })
  }

  handleSuccess ({ data: { results: newResult } = {} }) {
    this.setState(({ status, result, page }) => ({
      result: page > 1 ? [ ...result, ...newResult] : newResult,
      status: {
        ...status,
        autocomplete: statusState.downloaded,
        list: statusState.downloaded
      }
    }))
  }

  handleUpdateInput (searchText, dataSource, { source }) {
    if (source !== 'click') {
      if (searchText.length > 1) {
        this.setState(({ status }) => ({
          searchText,
          status: { ...status, autocomplete: statusState.fetching, list: statusState.fetching }
        }))
        this.handleSearch(searchText)
      } else {
        this.setState({ searchText, result: [] })
      }
    }
  }

  handleSearch (searchText) {
    this.setState({ page: 1 }, () => search(searchText).then(this.handleSuccess))
  }

  handleLoadMoreClick () {
    const { searchText, page } = this.state
    this.setState(
      ({ page }) => ({ page: page + 1 }),
      () => search(searchText, page + 1).then(this.handleSuccess)
    )
  }

  handleNewRequest ({ id }) {
    this.setState(({ status }) => ({ status: { ...status, details: statusState.fetching } }))
    getMovie(id)
      .then(({ data: details }) => {
        this.setState(({ status }) => ({ details, status: {...status, details: statusState.downloaded }}))
      })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MainSection
          {...this.state}
          onSearch={this.handleSearch}
          onClear={this.handleClear}
          onSuccess={this.handleSuccess}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          onDetailsClose={this.handleDetailsClose}
          onLoadMoreClick={this.handleLoadMoreClick}
        />
      </MuiThemeProvider>
    )
  }
}

export default App
