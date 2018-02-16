import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import Chip from 'material-ui/Chip'

import renderIfHasData from '../../hoc/renderIfHasData'

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

const LabeledItem = styled.div`
  padding: 20px 5px 5px;
  margin: 5px;
  position: relative;
  min-width: 140px;
  font-weight: ${({ primary }) => primary ? '500' : '400'};
  font-size: ${({ primary }) => primary ? '18px' : '14px'};

  > :first-child {
    position: absolute;
    top: 5px;
    font-size: 12px;
    font-weight: 400;
  }
`

const StyledIconDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`

const FlexHorizontal = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledChip = styled(Chip)`
  margin-right: 5px !important;
`

const StyledSpan = styled.span`
  margin-right: 5px;
`

const ItemArray = ({ children, chipMode }) => (
  <FlexHorizontal>
    {
      children.map(({ name }) => (
        chipMode ? <StyledChip>{name}</StyledChip> : <StyledSpan>{name}</StyledSpan>
      ))
    }
  </FlexHorizontal>
)

const ItemComponent = ({ label = '', children, chipMode, ...rest }) => (
  <LabeledItem {...rest}>
    <div>{label}</div>
    <div>
      {
        (Array.isArray(children))
          ? <ItemArray chipMode={chipMode}>{children}</ItemArray>
          : children
      }
    </div>
  </LabeledItem>
)

const Item = renderIfHasData(ItemComponent)

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
          <Item label="homepage">{data.homepage}</Item>
          <Item label="production countries">{data.production_countries}</Item>
          <Item label="production companies">{data.production_companies}</Item>
        </FlexHorizontal>
      </StyledPaper>
    )
  }
}

export default Details