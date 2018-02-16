import React, { Component } from 'react';

import styled from 'styled-components'

import TextField from 'material-ui/TextField'

import AutoComplete from './components/AutoComplete/AutoComplete'
import Details from './components/Details/Details'

import { search, getMovie, getImages } from './api'

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
  height: 100vh;

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

class App extends Component {
  constructor () {
    super()

    this.state = {
      result: [],
      status: status.initial,
      details: null,
      searchResults: null
    }

    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleUpdateInput = debounce(this.handleUpdateInput.bind(this), 250)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleDetailsClose = this.handleDetailsClose.bind(this)
  }

  handleDetailsClose () {
    this.setState({ details: null })
  }

  handleSuccess ({ data: { results: result } = {} }) {
    this.setState({ result, status: status.downloaded })
  }

  handleUpdateInput (text) {
    this.setState({ status: status.fetching })
    search(text).then(this.handleSuccess)
  }

  handleNewRequest ({ id }) {
    console.log('choose: ', id)
    getMovie(id).then(({ data: details }) => { console.log(details); this.setState({ details }) })
    getImages(id).then(data => { console.log(data) })
  }

  render() {
    const { result, status: { fetching }, details } = this.state
    return (
      <div>
        <Header>
          Search movie database
        </Header>
        <MainSection>
          <AutoComplete
            dataSource={result}
            fetching={fetching}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
          />
          {
            (details) && <Details data={details} onClose={this.handleDetailsClose} />
          }
        </MainSection>
      </div>
    );
  }
}

export default App
