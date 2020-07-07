import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import socket from '../socket'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  // socket.on('hello', (counter) => {
  //   console.log(`hello - ${counter}`)
  // })
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
