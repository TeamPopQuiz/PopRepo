import React from 'react'
import {Navbar, Footer} from './components'
import Routes from './routes'
import {connect} from 'react-redux'

const App = props => {
  return (
    <div>
      <Navbar />
      <Routes id="maincontainer" />
      {!props.user.student ? <Footer /> : null}
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(App)
