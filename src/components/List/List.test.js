import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FlatButton from 'material-ui/FlatButton'

import List, { MovieList, NoResults } from './List'

const basicProps = {
  data: [],
  searchPhrase: 'abc',
  fetching: false
}

describe('List', () => {
  it('should render information about no search result', () => {
    const wrapper = shallow(<List {...basicProps} />)
    expect(wrapper.find(NoResults)).toHaveLength(1)
    expect(wrapper.find(MovieList)).toHaveLength(0)
  })
})

describe('MovieList', () => {
  it(`renders "Load more" button when there is something more to fetch`, () => {
    const wrapper = mount(<MuiThemeProvider><List {...basicProps} data={[{}, {}]} isMore={true} /></MuiThemeProvider>)
    expect(wrapper.find(FlatButton)).toHaveLength(1)
  })

  it(`doesn't render "Load more" button when there is nothing more to fetch`, () => {
    const wrapper = mount(<MuiThemeProvider><List {...basicProps} data={[{}, {}]} isMore={false} /></MuiThemeProvider>)
    expect(wrapper.find(FlatButton)).toHaveLength(0)
  })
})