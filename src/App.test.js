import React from 'react'
import { shallow, mount } from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import muiTheme from './theme/theme'

import App from './App'

it('renders without crashing', () => {
  shallow(
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  )
})

it('handles autocomplete field changes (searchText)', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find(IconButton)).toHaveLength(0)
  wrapper.setState({ searchText: 'a' })

  const iconButton = wrapper.find(IconButton)
  expect(iconButton).toHaveLength(1)
  iconButton.simulate('click')
  expect(wrapper.state().searchText).toEqual('')
})

it('handles autocomplete field changes (searchText)', () => {
  const wrapper = mount(<App />)

})