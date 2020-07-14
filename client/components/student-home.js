import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class StudentHome extends Component {
  render() {
    return (
      <div>
        <p>WELCOME</p>
        <Link to="/student/quiz" className="button-link">
          <button type="button">click to start</button>
        </Link>
      </div>
    )
  }
}

export default StudentHome
