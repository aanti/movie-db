import React, { Component } from 'react';

import styled from 'styled-components'

import TextField from 'material-ui/TextField'

import AutoComplete from './components/AutoComplete/AutoComplete'
import FetchedDetails from './components/Details/Details'
import FetchedList from './components/List/List'

import fetching from './hoc/fetching'
import { search, getMovie, getImages } from './api'

const Details = fetching(FetchedDetails)
const List = fetching(FetchedList)

const Header = styled.div`
  background-color: gray;
  color: white;
  padding: 20px;
  font-size: 20px;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0px auto;
  background-color: #e3e3e3;

  > div {
    margin: 20px 0 0;
  }
`

function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
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
      status: {
        autocomplete: statusState.initial,
        details: statusState.initial,
        list: statusState.initial
      },
      result: [],
      details: null,
      searchPhrase: ''
    }

    this.handleAutoCompleteSuccess = this.handleAutoCompleteSuccess.bind(this)
    this.handleListSuccess = this.handleListSuccess.bind(this)
    this.handleUpdateInput = debounce(this.handleUpdateInput.bind(this), 250)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleDetailsClose = this.handleDetailsClose.bind(this)
    this.handleFindButtonClick = this.handleFindButtonClick.bind(this)
  }

  handleFindButtonClick (searchPhrase) {
    this.setState(({ status }) => ({details: null, searchPhrase, status: { ...status, list: statusState.fetching }}), () => {
      search(searchPhrase).then(this.handleListSuccess)
    })
  }

  handleDetailsClose () {
    this.setState({ details: null, searchPhrase: '' })
  }

  handleAutoCompleteSuccess ({ data: { results: result } = {} }) {
    this.setState(({ status }) => ({ result, status: { ...status, autocomplete: statusState.downloaded }}))
  }

  handleListSuccess ({ data: { results: result } = {} }) {
    this.setState(({ status }) => ({ result, status: { ...status, list: statusState.downloaded }}))
  }

  handleUpdateInput (text) {
    this.setState(({ status }) => ({ status: { ...status, autocomplete: statusState.fetching }}))
    search(text).then(this.handleAutoCompleteSuccess)
  }

  handleNewRequest ({ id }) {
    this.setState(({ status }) => ({ status: { ...status, details: statusState.fetching } }))
    getMovie(id)
      .then(({ data: details }) => {
        this.setState(({ status }) => ({ details, status: {...status, details: statusState.downloaded }}))
      })
  }

  render() {
    const { result, status, details, searchPhrase } = this.state
    return (
      <div>
        <Header>
          Search movie database
        </Header>
        <MainSection>
          <AutoComplete
            dataSource={result}
            fetching={status.autocomplete.fetching}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            onButtonClick={this.handleFindButtonClick}
          />
          {
            (details) && (
              <Details data={details} fetching={status.details.fetching} onClose={this.handleDetailsClose} />
            )
          }
          {
            (!details && status.list.downloaded && searchPhrase) && (
              <List searchPhrase={searchPhrase} data={result} onClick={this.handleNewRequest} />
            )
          }
        </MainSection>
      </div>
    );
  }
}

export default App
