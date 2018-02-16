import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import Chip from 'material-ui/Chip'

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
  min-width: 100px;
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

const Item = ({ label = '', children, ...rest }) => (children)
  ?
    <LabeledItem {...rest}>
      <div>{label}</div>
      <div>{children}</div>
    </LabeledItem>
  :
    null

const GenreItem = ({ genres }) => (
  <FlexHorizontal>
    {
      genres.map(({ name }) => <StyledChip>{name}</StyledChip>)
    }
  </FlexHorizontal>
)


const Details = ({ data, onClose }) => {
  const { title, genres = [], overview, original_Language, release_date, backdrop_path: imgPath, vote_average, tagline } = data
  return (
    <StyledPaper>
      <StyledIconDiv>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </StyledIconDiv>
      <FlexHorizontal>
        <div>
          <img src={`${ImageUrlBase}${imgPath}`}/>
        </div>
        <div>
          <Item label="title" primary>{title}</Item>
          <Item label="tagline" primary>{tagline}</Item>
        </div>
      </FlexHorizontal>
      <FlexHorizontal>
        <Item label="vote avg." primary>{vote_average}</Item>
        <Item label="genre">
          <GenreItem genres={genres} />
        </Item>
        <Item label="overview">{overview}</Item>
        <Item>{original_Language}</Item>
        <Item label="release date">{release_date}</Item>
      </FlexHorizontal>
    </StyledPaper>
  )
}

export default Details