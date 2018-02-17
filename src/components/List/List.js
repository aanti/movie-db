import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SadIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import ListItem from './ListItem/ListItem'

import fetching from '../../hoc/fetching'

const Container = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 60px;
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const NoResultsComponent = ({ searchPhrase }) => (
  <NoResultsContainer>
    <div>
      Sorry, there are no results for {<b>{searchPhrase}</b>}...
    </div>
    <SadIcon />
  </NoResultsContainer>
)

export const NoResults = fetching(NoResultsComponent)

export const MovieList = ({ data, fetching, searchPhrase, isMore, onClick, onLoadMoreClick }) => (
  <div>
    <div>Results for {<b>{searchPhrase}</b>}</div>
    <ListContainer>
      {data.map((d, i) => <ListItem data={d} key={i} index={i} onClick={() => onClick(d)} />)}
    </ListContainer>
    {
      (isMore) && (
        <CenteredDiv>
          {
            (!fetching)
              ?
                <FlatButton
                  label="I want more!"
                  labelPosition="before"
                  icon={<RightIcon />}
                  onClick={onLoadMoreClick}
                />
              :
                <CircularProgress />
          }
        </CenteredDiv>
      )
    }
  </div>
)

const List = ({ searchPhrase, data, fetching, ...rest }) => (
  <Container>
    {
      (data.length)
        ? <MovieList data={data} searchPhrase={searchPhrase} {...rest} />
        : <NoResults data={data} searchPhrase={searchPhrase} fetching={fetching} />
    }
  </Container>
)

List.propTypes = {
  searchPhrase: PropTypes.string,
  data: PropTypes.array,
  fetching: PropTypes.bool,
  isMore: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadMoreClick: PropTypes.func
}

export default List
