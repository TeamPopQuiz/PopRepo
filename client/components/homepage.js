import React, {Component} from 'react'
import {connect} from 'react-redux'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

export class Homepage extends Component {
  render() {
    return (
      <Container className="home-image">
        <div>
          <Image
            fluid
            // height="300 px"
            // width="300px"
            src="/MindPopBackground.jpg"
          />
        </div>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

export default connect(mapState, null)(Homepage)
