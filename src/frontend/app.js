import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { LookRoot } from 'react-look'
import log from './log'
import reducers from './reducers'
import App from './components/App'

window.log = log
window.onerror = (msg, file, line, col, error) => {
  if (!error) {
    log.error('Uncaught exception with null error object')
    return
  }

  log.error(error)

  if (window.location.href.split('/')[2].split(':')[0] !== 'localhost') {
    setTimeout(() => {
      alert(`Whoops! Something went wrong. We\'re looking into it,
        but in the meantime please refresh your browser.`)
      document.location.reload(true)
    }, 2000)
  }
}

const store = createStore(reducers)
const history = syncHistoryWithStore(browserHistory, store)
const AppContainer = () => (
  <LookRoot>
    <App />
  </LookRoot>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/map' component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('mount')
)
