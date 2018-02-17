import React from 'react'
import { shallow, mount } from 'enzyme'

import Chip from 'material-ui/Chip'

import Item, { ItemComponent, ItemArray, SingleItem, StyledChip } from './Item'

const props = {
  data: {},
  onClick: () => {}
}

describe('Item', () => {
  it(`doesn't render if there's no data`, () => {
    const wrapper = shallow(<Item />)
    expect(wrapper.text()).toBe('')
  })

  it(`renders if there is data (child exists)`, () => {
    const wrapper = shallow(<Item label="labelText">value</Item>)
    expect(wrapper.text()).toBe('<ItemComponent />')
  })
})

describe('ItemComponent', () => {
  it('renders with label and value properly', () => {
    const wrapper = shallow(<ItemComponent label="labelText">value</ItemComponent>)
    expect(wrapper.children()).toHaveLength(2)
  })

  it('renders ItemArray if value is an array', () => {
    const component = <ItemComponent label="labelText">{['a', 'b']}</ItemComponent>
    const wrapper = shallow(component)
    expect(wrapper.find(ItemArray)).toHaveLength(1)
    expect(wrapper.find(SingleItem)).toHaveLength(0)
  })

  it('renders SingleItem if value is not an array', () => {
    const component = <ItemComponent label="labelText">A</ItemComponent>
    const wrapper = shallow(component)
    expect(wrapper.find(ItemArray)).toHaveLength(0)
    expect(wrapper.find(SingleItem)).toHaveLength(1)
  })
})

describe('SingleItem', () => {
  it('wraps children values in passed component (from props)', () => {
    const component = <SingleItem label="labelText" component={Chip}>A</SingleItem>
    expect(shallow(component).find(Chip)).toHaveLength(1)
  })
})

describe('ItemArray', () => {
  it('renders chips when chipMode is on (passed via props)', () => {
    const component = <ItemArray chipMode>{['a', 'b', 'c']}</ItemArray>
    const wrapper = shallow(component)
    expect(wrapper.find(StyledChip)).toHaveLength(3)
  })
})
