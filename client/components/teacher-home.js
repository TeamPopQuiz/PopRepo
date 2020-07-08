import React from 'react'
import {Link} from 'reac-router-dom'

export const TeacherHome = () => {
  return (
    <div>
      <Link to="/classrooms">
        <button type="button">VIEW CLASSROOMS</button>
      </Link>
      <Link to="/classrooms/create">
        <button type="button">CREATE CLASSROOM</button>
      </Link>
      <Link to="/students">
        <button type="button">EDIT STUDENTS</button>
      </Link>
      <Link to="/classrooms/data">
        <button type="button">CLASS DATA</button>
      </Link>
    </div>
  )
}
