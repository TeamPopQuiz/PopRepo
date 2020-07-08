import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>MindPop</h3>
        <Link to="/home">Home</Link>
        <Link to="/classrooms">View Classrooms</Link>
        <Link to="/classrooms/create">Create Classrooms</Link>
        <Link to="/classrooms/edit">Edit Classrooms</Link>
        <Link to="/home/profile">Profile</Link>
        <Link to="/home/logout">Logout</Link>
      </div>
    )
  }
}

export default Dashboard
