import React from 'react'
import { shallow } from 'enzyme'

import ListItem from './ListItem'

const props = {
  data: {},
  onClick: () => {}
}

it('renders without crashing', () => {
  shallow(<ListItem {...props} />)
})