import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addSubject} from '../store/subject'

export class AddRoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subjectName: '',
      subjectCode: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addRoomAction({...this.state, role: this.props.user.role})
    this.setState({
      subjectName: '',
      subjectCode: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Add New Room</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="subjectName"
            onChange={this.handleChange}
            value={this.state.subjectName}
            placeholder="Subject Name"
          />
          <input
            type="text"
            name="subjectCode"
            onChange={this.handleChange}
            value={this.state.subjectCode}
            placeholder="Subject Code"
          />
          {/* <h3>Student Roster</h3> */}
          {/* {
              this.props.students.map(student => {
                return (
                  <label key={student.id}>
                    <input  type="checkbox" name={student.firstName} onChange={this.handleChange} value={student.email} />
                    {student.email}
                  </label>
                )
              })
            } */}
          <button type="submit">Create Room</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    students: state.user.students,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addRoomAction: obj => dispatch(addSubject(obj))
    // getRooms: () => dispatch(getSubjects())
  }
}

export default connect(mapState, mapDispatch)(AddRoom)
