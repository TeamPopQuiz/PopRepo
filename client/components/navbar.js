import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, role}) => (
  <div className="navbar">
    <h1 className="header">MindPop</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {role === 'teacher' ? (
            <div className="navbarbackground">
              <Link to="/teacher-home">
                <button type="button">HOME</button>
              </Link>
              <Link to="/all-subjects">
                <button type="button">SUBJECTS</button>
              </Link>
              <Link to="/create">
                <button type="button">CREATE CLASSROOMS</button>
              </Link>
              <Link onClick={handleClick}>
                <button type="button">LOGOUT</button>
              </Link>
            </div>
          ) : (
            <div className="navbarbackground">
              <Link to="/home">
                <button type="button">HOME</button>
              </Link>
              <Link to="/quiz">
                <button type="button">QUIZ</button>
              </Link>
              <Link onClick={handleClick}>
                <button type="button">LOGOUT</button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="navbarbackground">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <button type="button">LOGIN</button>
          </Link>
          <Link to="/signup">
            <button type="button">SIGNUP</button>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
