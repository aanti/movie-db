import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Item from '../../Item/Item'

const Container = styled.div`
  padding: 20px;
  background-color: lightgray;
  margin: 10px 0;

  :hover {
    background-color: #b3b3b3;
    cursor: pointer;
  }
`

const ListItem = ({ data: { title, release_date, overview }, index, onClick }) => (
  <Container onClick={onClick}>
    <div>{index + 1}.</div>
    <Item primary>{title}</Item>
    <Item label="year">{release_date.split('-')[0]}</Item>
    <Item label="overview" chipMode>{overview}</Item>
  </Container>
)

export default ListItem
