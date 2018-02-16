import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import Item, { FlexHorizontal } from '../Item/Item'

const ImageUrlBase = 'http://image.tmdb.org/t/p/w185//'

const StyledPaper = styled(Paper)`
  position: relative;
  max-width: 600px;
  padding: 20px;
  background-color: #f8f8f8 !important;
  > div {
    flex: 1 0 200px;
  }
`

const StyledIconDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`

const StyledLink = styled.a`
  color: #555555;
  text-decoration: none;
  font-weight: 500;
  :hover {
    color: #b6c618;
  }
`

const Link = ({ children }) => <StyledLink href={children} target="_blank">{children}</StyledLink>

class Details extends Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
    this.handleImgError = this.handleImgError.bind(this)
  }

  handleImgError () {
    this.setState({ error: true })
  }

  render () {
    const { error } = this.state
    const { data, onClose } = this.props

    return (
      <StyledPaper>
        <StyledIconDiv>
          <IconButton onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </StyledIconDiv>
        <FlexHorizontal>
          <div>
            {(!error) && <img src={`${ImageUrlBase}${data.backdrop_path}`} alt="" onError={this.handleImgError} />}
          </div>
          <div>
            <Item label="title" primary>{data.title}</Item>
            <Item label="tagline" primary>{data.tagline}</Item>
          </div>
        </FlexHorizontal>
        <FlexHorizontal>
          <Item label="vote avg." primary>{data.vote_average}</Item>
          <Item label="genre" chipMode>{data.genres}</Item>
          <Item label="overview">{data.overview}</Item>
          <Item label="original language">{data.original_Language}</Item>
          <Item label="release date">{data.release_date}</Item>
          <Item label="homepage" component={Link}>{data.homepage}</Item>
          <Item label="production countries">{data.production_countries}</Item>
          <Item label="production companies">{data.production_companies}</Item>
        </FlexHorizontal>
      </StyledPaper>
    )
  }
}

export default Details