import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor() {
    super()
    this.state = {role: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          {this.props.name === 'signup' ? (
            <div>
              <div>
                <label htmlFor="firstname">
                  <small>First Name</small>
                </label>
                <input name="firstname" type="text" />
              </div>
              <div>
                <label htmlFor="lastname">
                  <small>Last Name</small>
                </label>
                <input name="lastname" type="text" />
              </div>
            </div>
          ) : null}
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="role">
              <small>Role</small>
            </label>
            <select name="role" type="text" onChange={this.handleChange}>
              <option />
              <option>Teacher</option>
              <option name="student" value="student">
                Student
              </option>
            </select>
          </div>
          {this.state.role === 'student' ? (
            <div>
              <label htmlFor="teacher">
                <small>Teacher</small>
              </label>
              <input name="teacher" type="text" />
            </div>
          ) : null}
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('inside dispatch')
      const formName = evt.target.name
      const firstName = evt.target.firstname
      const lastName = evt.target.lastname
      const email = evt.target.email.value
      const password = evt.target.password.value
      const role = evt.target.role.value
      const teacher = evt.target.teacher.value
      dispatch(
        auth(firstName, lastName, email, password, role, formName, teacher)
      )
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
