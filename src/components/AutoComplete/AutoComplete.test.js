import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ClearIcon from 'material-ui/svg-icons/content/clear'

import AutoComplete, { StyledLoader } from './AutoComplete'

const basicProps = {
  dataSource: [],
  fetching: false,
  searchText: '',
  onClear: () => {}
}

describe('AutoComplete', () => {
  it(`shouldn't render clear icon when searchText is empty`, () => {
    const wrapper = mount(<MuiThemeProvider><AutoComplete {...basicProps} /></MuiThemeProvider>)
    expect(wrapper.find(ClearIcon)).toHaveLength(0)
  })

  it('should render clear icon when searchText exists', () => {
    const wrapper = mount(<MuiThemeProvider><AutoComplete {...basicProps} searchText="abc" /></MuiThemeProvider>)
    expect(wrapper.find(ClearIcon)).toHaveLength(1)
  })

  it('should render Loader when fetching', () => {
    const wrapper = mount(<MuiThemeProvider><AutoComplete {...basicProps} searchText="abc" fetching /></MuiThemeProvider>)
    expect(wrapper.find(StyledLoader)).toHaveLength(1)
  })

  it(`shouldn't render Loader when not fetching`, () => {
    const wrapper = mount(<MuiThemeProvider><AutoComplete {...basicProps} searchText="abc" /></MuiThemeProvider>)
    expect(wrapper.find(StyledLoader)).toHaveLength(0)
  })
})