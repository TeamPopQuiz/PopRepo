import React, {useState, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import socket from '../socket'
import {render} from 'enzyme'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      quizCode: ''
    }
    this.handleSubmitCode = this.handleSubmitCode.bind(this)
    this.handleInputChangeCode = this.handleInputChangeCode.bind(this)
  }

  handleInputChangeCode(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitCode(event) {
    event.preventDefault()
    let code = {
      quizCode: this.state.quizCode
    }
  }

  render() {
    const {email} = this.props

    return (
      <div className="student-home">
        <h3>Welcome, {email}!</h3>
        <h2>Enter Quiz Code</h2>
        <div>
          <form onSubmit={this.handleSubmitCode}>
            <label>
              <input
                type="text"
                name="quizCode"
                onChange={this.handleInputChangeCode}
                value={this.state.quizCode}
              />
            </label>
            <Link className="quiz-code" to={`/quiz/${this.state.quizCode}`}>
              <button type="submit">Start Quiz!</button>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email,
    role: state.user.role,
    quizCode: state.quizCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitRoom: () => dispatch(submittedRoom())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
