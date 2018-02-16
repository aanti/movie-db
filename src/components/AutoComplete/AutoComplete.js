import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import AutoCompleteMUI from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ClearIcon from 'material-ui/svg-icons/content/clear'

const Container = styled(Paper)`
  padding: 20px;
  background-color: gray !important;
  flex: 0 0 60px;
`

const StyledLoader = styled(CircularProgress)`
  position: absolute !important;
  right: 132px;
  top: 18px;
`

const SecondaryText = styled.span`
  color: gray;
  font-size: 10px;
`

const PrimaryText = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const SearchDiv = styled.div`
  margin-right: 50px;
  width: 340px;
`

const CloseIconDiv = styled.div`
  position: absolute;
  left: -50px;
  svg {
    fill: gray !important;
  }
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

const AutoComplete = ({ className, fetching, dataSource, searchText, onButtonClick, onClear, ...rest }) => (
  <Container className={className}>
    {
      (!!searchText.length) && (
        <CloseIconDiv>
          <IconButton onClick={onClear}><ClearIcon /></IconButton>
        </CloseIconDiv>
      )
    }
    <SearchDiv>
      <AutoCompleteMUI
        {...rest}
        searchText={searchText}
        dataSource={dataSource.map(getMenuItem)}
        hintText="Start writing some text here"
        filter={filterDataSource}
        fullWidth
      />
      {
        (fetching) && <StyledLoader size={24} />
      }
    </SearchDiv>
    <RaisedButton onClick={onButtonClick}>FIND</RaisedButton>
  </Container>
)

AutoComplete.defaultProps = {
  dataSource: []
}

AutoComplete.propTypes = {
  className: PropTypes.string,
  fetching: PropTypes.bool,
  dataSource: PropTypes.array,
  searchText: PropTypes.string,
  onClick: PropTypes.func,
  onClear: PropTypes.func
}

export default styled(AutoComplete)`
  position: relative;
  width: 440px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`
