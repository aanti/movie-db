import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Chip from 'material-ui/Chip'

import renderIfHasData from '../../hoc/renderIfHasData'

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

export const FlexHorizontal = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const StyledChip = styled(Chip)`
  margin-right: 5px !important;
`

const StyledSpan = styled.span`
  margin-right: 5px;
  :not(:last-child):after {
    content: ", ";
  }
`

export const ItemArray = ({ children, chipMode }) => (
  <FlexHorizontal>
    {
      children.map(({ name }, i) => (
        chipMode ? <StyledChip key={i}>{name}</StyledChip> : <StyledSpan key={i}>{name}</StyledSpan>
      ))
    }
  </FlexHorizontal>
)

export const SingleItem = ({ component, children, ...rest }) => component
  ? React.createElement(component, rest, children)
  : children

export const ItemComponent = ({ label = '', children, chipMode, component, ...rest }) => (
  <LabeledItem {...rest}>
    <div>{label}</div>
    <div>
      {
        (Array.isArray(children))
          ? <ItemArray chipMode={chipMode}>{children}</ItemArray>
          : <SingleItem component={component}>{children}</SingleItem>
      }
    </div>
  </LabeledItem>
)

ItemComponent.propTypes = {
  label: PropTypes.string,
  chipMode: PropTypes.bool,
  component: PropTypes.element
}

export const Item = renderIfHasData(ItemComponent)

export default Item
