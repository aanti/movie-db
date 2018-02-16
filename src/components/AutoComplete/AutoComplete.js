import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import AutoCompleteMUI from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const StyledLoader = styled(CircularProgress)`
  //border: 1px solid orange;
`

const Container = styled(Paper)`
  padding: 20px;
  background-color: gray !important;
  flex: 0 0 60px;
`

const SecondaryText = styled.span`
  color: gray;
  font-size: 10px;
`

const PrimaryText = styled.div`
  text-overflow: ellipsis;
  max-width: 150px;
`

const SearchDiv = styled.div`
  margin-right: 20px;
  width: 280px;
`

function getPrimaryText (title) {
  return <PrimaryText>{title}</PrimaryText>
}

function getSecondaryText (date) {
  return <SecondaryText>{date.split('-')[0]}</SecondaryText>
}

function getMenuItem ({ title, release_date: date, id }) {
  return {
    text: title,
    id,
    value: <MenuItem primaryText={getPrimaryText(title)} secondaryText={getSecondaryText(date)} />
  }
}

function filterDataSource (searchText) {
  return searchText !== ''
}

class AutoComplete extends Component {
  constructor () {
    super()
    this.state = {
      searchText: ''
    }

    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
  }

  handleUpdateInput (searchText, b, { source }) {
    console.log('AutoComplete: handleUpdateInput', searchText, b, source)
    this.setState({
      searchText: source === 'change' ? searchText : ''
    }, () => { searchText && source === 'change' && this.props.onUpdateInput(searchText) })
  }

  handleNewRequest (value, i) {
    console.log('ITEM SELECTION!!!')
    console.log(value)
    const { onNewRequest } = this.props

  }

  render () {
    const { className, fetching = false, dataSource = [], ...rest } = this.props
    return (
      <Container className={className}>
        <SearchDiv>
          <AutoCompleteMUI
            dataSource={dataSource.map(getMenuItem)}
            {...rest}
            searchText={this.state.searchText}
            filter={filterDataSource}
            onUpdateInput={this.handleUpdateInput}
            fullWidth
          />
          {
            fetching && <StyledLoader size={24} />
          }
        </SearchDiv>
        <RaisedButton>FIND</RaisedButton>
      </Container>
    )
  }
}


export default styled(AutoComplete)`
  position: relative;
  width: 400px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  ${StyledLoader} {
    right: 0px;
    top: 8px;
    position: absolute !important;
  }
`
