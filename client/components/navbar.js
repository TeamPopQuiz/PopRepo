import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, role}) => (
  <div className="navbar">
    <h1 className="header">MindPop</h1>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {role === 'teacher' ? (
            <div>
              <Link to="/teacher-home">
                <button type="button">Home</button>
              </Link>
              <Link to="/all-subjects">
                <button type="button">Subjects</button>
              </Link>
              <Link to="/create">
                <button type="button">Create Classrooms</button>
              </Link>
              <Link onClick={handleClick}>
                <button type="button">Logout</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/home">
                <button type="button">Home</button>
              </Link>
              <Link to="/quiz">
                <button type="button">Quiz</button>
              </Link>
              <Link onClick={handleClick}>
                <button type="button">Logout</button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          <Link to="/signup">
            <button type="button">Sign Up</button>
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
