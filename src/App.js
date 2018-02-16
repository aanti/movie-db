import React, { Component } from 'react'
import styled from 'styled-components'

import AutoComplete from './components/AutoComplete/AutoComplete'
import FetchedDetails from './components/Details/Details'
import List from './components/List/List'

import fetching from './hoc/fetching'
import { search, getMovie } from './api'

const Details = fetching(FetchedDetails)

const Header = styled.div`
  background-color: #636363;
  color: white;
  padding: 20px;
  font-size: 20px;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0px auto;
  background-color: #e3e3e3;

  > div {
    margin: 20px 0 0;
  }
`

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
      dataSource: [],
      details: null,
      page: 1
    }

    this.handleSearch = debounce(this.handleSearch.bind(this), 250)
    this.handleClear = this.handleClear.bind(this)
    this.handleAutoCompleteSuccess = this.handleAutoCompleteSuccess.bind(this)
    this.handleListSuccess = this.handleListSuccess.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleDetailsClose = this.handleDetailsClose.bind(this)
    this.handleFindButtonClick = this.handleFindButtonClick.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleClear () {
    this.setState({
      page: 1,
      searchText: ''
    })
  }

  handleFindButtonClick () {
    const { searchText } = this.state
    this.setState(({ status }) => ({
        details: null,
        status: { ...status, list: statusState.fetching }
      }), () => {
      search(searchText).then(this.handleListSuccess)
    })
  }

  handleDetailsClose () {
    this.setState({ details: null })
  }

  handleAutoCompleteSuccess ({ data: { results: result } = {} }) {
    this.setState(({ status }) => ({
      result,
      status: {
        ...status,
        autocomplete: statusState.downloaded,
        list: statusState.downloaded
      }
    }))
  }

  handleListSuccess ({ data: { results } = {} }) {
    this.setState(({ status, result }) => ({
      result: [...result, ...results ],
      status: { ...status, list: statusState.downloaded
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
    this.setState({ page: 1 }, () => search(searchText).then(this.handleAutoCompleteSuccess))
  }

  handleLoadMoreClick () {
    const { searchText } = this.state
    this.setState(
      ({ page }) => ({ page: page + 1 }),
      () => search(searchText, this.state.page).then(this.handleListSuccess)
    )
  }

  handleNewRequest ({ id }) {
    if (id) {
      this.setState(({ status }) => ({ status: { ...status, details: statusState.fetching } }))
      getMovie(id)
        .then(({ data: details }) => {
          this.setState(({ status }) => ({ details, status: {...status, details: statusState.downloaded }}))
        })
    } else {
      this.handleFindButtonClick(this.state.searchText)
    }
  }

  render() {
    const { result, status, details, searchText } = this.state
    return (
      <div>
        <Header>
          Search movie database
        </Header>
        <MainSection>
          <AutoComplete
            dataSource={result}
            searchText={searchText}
            fetching={status.autocomplete.fetching}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            onButtonClick={this.handleFindButtonClick}
            onClear={this.handleClear}
          />
          {
            (details) && (
              <Details
                data={details}
                result={result}
                fetching={status.details.fetching}
                onClose={this.handleDetailsClose}
              />
            )
          }
          {
            (!details) && (searchText.length > 1) && (
              <List
                searchPhrase={searchText}
                data={result}
                fetching={status.list.fetching}
                onClick={this.handleNewRequest}
                onLoadMoreClick={this.handleLoadMoreClick}
              />
            )
          }
        </MainSection>
      </div>
    );
  }
}

export default App
