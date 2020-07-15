import React, {Component} from 'react'
import {connect} from 'react-redux'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

export class Homepage extends Component {
  render() {
    return (
      <Container className="teacherhome" fluid>
        <div>
          <h1>hello!</h1>
          <p>
            Mindpop is an education and interactive platform... ADD DESCRIPTION
          </p>
          <Image
            fluid
            // height="300 px"
            // width="300px"
            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
          />
          {/* include image and blurb */}
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
