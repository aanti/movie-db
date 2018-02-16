import React from 'react'
import styled from 'styled-components'

import AutoComplete from '../AutoComplete/AutoComplete'
import FetchedDetails from '../Details/Details'
import List from '../List/List'

import fetching from '../../hoc/fetching'

const Details = fetching(FetchedDetails)

const Header = styled.div`
  background-color: #636363;
  color: white;
  padding: 20px;
  font-size: 20px;
`

const MainSectionDiv = styled.div`
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

const MainSection = ({ result, status, details, searchText, isMore, onSearch, onSuccess, ...handlers }) => {
  const { onUpdateInput, onNewRequest, onClear, onDetailsClose, onLoadMoreClick } = handlers
  return (
    <div>
      <Header>
        Search movie database
      </Header>
      <MainSectionDiv>
        <AutoComplete
          dataSource={result}
          searchText={searchText}
          fetching={status.autocomplete.fetching}
          onUpdateInput={onUpdateInput}
          onNewRequest={onNewRequest}
          onClear={onClear}
        />
        {
          (details) && (
            <Details
              data={details}
              result={result}
              fetching={status.details.fetching}
              onClose={onDetailsClose}
            />
          )
        }
        {
          (!details) && (searchText.length > 1) && (
            <List
              searchPhrase={searchText}
              data={result}
              fetching={status.list.fetching}
              isMore={isMore}
              onClick={onNewRequest}
              onLoadMoreClick={onLoadMoreClick}
            />
          )
        }
      </MainSectionDiv>
    </div>
  )
}

export default MainSection
