import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Item from '../../Item/Item'

const Container = styled.div`
  padding: 10px;
  background-color: lightgray;
  margin: 5px 10px 5px 0;
  flex: 1 1 300px;
  max-height: 200px;

  :hover {
    background-color: #b3b3b3;
    cursor: pointer;
  }
`

const Ellipsed = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`

/**
 * ListItem
 * - Single list item displayed on search results list
 */
const ListItem = ({ data: { title, release_date, overview }, onClick }) => (
  <Container onClick={onClick}>
    <Item primary>{title}</Item>
    <Item label="year">{release_date && release_date.split('-')[0]}</Item>
    <Item label="overview" component={Ellipsed}>{overview}</Item>
  </Container>
)

ListItem.propTypes = {
  /**
   * Single movie data
   */
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default ListItem
