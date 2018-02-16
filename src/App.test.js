import React from 'react'
import { shallow } from 'enzyme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'

it('renders without crashing', () => {
  shallow(
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  )
})