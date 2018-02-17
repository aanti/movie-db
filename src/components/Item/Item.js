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


/**
 * ItemArray
 * - renders  array of values (list of production companies, genres, etc.) in given mode (chipMode)
 */
export const ItemArray = ({ children, chipMode }) => (
  <FlexHorizontal>
    {
      children.map(({ name }, i) => (
        chipMode ? <StyledChip key={i}>{name}</StyledChip> : <StyledSpan key={i}>{name}</StyledSpan>
      ))
    }
  </FlexHorizontal>
)

ItemArray.defaultProps = {
  chipMode: false
}

ItemArray.propTypes = {
  /**
   * Flag indicating if array items should be rendered as chips (Chip element from Material-UI lib)
   */
  chipMode: PropTypes.bool
}

/**
 * SingleItem
 * - renders single data value (raw or wrapped in passed component)
 */

export const SingleItem = ({ component, children, ...rest }) => component
  ? React.createElement(component, rest, children)
  : children

SingleItem.propTypes = {
  /**
   * Component used to wrap children
   */
  component: PropTypes.element
}

/**
 * ItemComponent
 * - renders data value (ItemArray or SingleItem, based on value type)
 */
export const ItemComponent = ({ label, children, chipMode, component, ...rest }) => (
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

ItemComponent.defaultProps = {
  label: ''
}

ItemComponent.propTypes = {
  /**
   * label for data field
   */
  label: PropTypes.string,
  /**
   * Flag indicating if array items should be rendered as chips (Chip element from Material-UI lib)
   */
  chipMode: PropTypes.bool,
  /**
   * Component used to wrap children
   */
  component: PropTypes.element
}

export const Item = renderIfHasData(ItemComponent)

export default Item
