import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SadIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import FlatButton from 'material-ui/FlatButton'

import ListItem from './ListItem/ListItem'

const Container = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PhraseSpan = styled.span`
  font-weight: 500;
`

const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  margin: 20px 0;
  padding: 25px;
  font-size: 20px;
  color: gray;

  svg {
    fill: gray !important;
    margin-left: 5px;
    width: 40px !important;
    height: 40px !important;
  }
`

const CenteredDiv = styled.div`
  text-align: center;
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const NoResults = ({ searchPhrase }) => (
  <NoResultsContainer>
    <div>
      Sorry, there are no results for {<b>{searchPhrase}</b>}...
    </div>
    <SadIcon />
  </NoResultsContainer>
)

const MovieList = ({ data, searchPhrase, onClick, onLoadMoreClick }) => (
  <div>
    <div>Results for {<b>{searchPhrase}</b>}</div>
    <ListContainer>
      {data.map((d, i) => <ListItem data={d} key={i} index={i} onClick={() => onClick(d)} />)}
    </ListContainer>
    <CenteredDiv>
      <FlatButton
        label="I want more!"
        labelPosition="before"
        icon={<RightIcon />}
        onClick={onLoadMoreClick}
      />
    </CenteredDiv>
  </div>
)

const List = ({ searchPhrase, data = [], onClick, onLoadMoreClick }) => (
  <Container>
    {
      (data.length)
        ? <MovieList searchPhrase={searchPhrase} data={data} onClick={onClick} onLoadMoreClick={onLoadMoreClick} />
        : <NoResults searchPhrase={searchPhrase} />
    }
  </Container>
)

export default List
