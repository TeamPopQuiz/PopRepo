import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {linkQuiz} from '../store/activeQuiz'
import history from '../history'

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
    history.push(`/quiz/${this.state.quizCode}`)
    this.props.linkToQuiz(this.state.quizCode, this.props.user.student.id)
    this.setState({
      quizCode: ''
    })
  }

  render() {
    const {email, user} = this.props

    return (
      <div className="student-home">
        <h2>
          Hi,{' '}
          {user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)}!
        </h2>
        <h1>Please Enter Quiz Code</h1>
        <div>
          <form className="quiz-code-form" onSubmit={this.handleSubmitCode}>
            <label>
              <input
                type="text"
                name="quizCode"
                className="student-home-input"
                placeholder="code"
                onChange={this.handleInputChangeCode}
                value={this.state.quizCode}
              />
            </label>
            <button className="quiz-code-btn" type="submit">
              Start Quiz!
            </button>
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
    user: state.user,
    email: state.user.email,
    role: state.user.role,
    quizCode: state.quizCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    linkToQuiz: (quizCode, studentId) => dispatch(linkQuiz(quizCode, studentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
