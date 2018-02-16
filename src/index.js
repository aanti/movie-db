import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import muiTheme from './theme/theme'

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
