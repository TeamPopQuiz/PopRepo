import React from 'react'
import {Navbar, Footer} from './components'
import Routes from './routes'

const App = props => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
