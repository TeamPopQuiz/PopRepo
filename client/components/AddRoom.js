import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addSubject} from '../store/subject'
import {getStudents} from '../store/students'

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

  componentDidMount() {
    this.props.getAllStudents()
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
          {/* Will need to add component that allows teachers to assign students to room */}
          <button type="submit">Create Room</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    students: state.students
  }
}

const mapDispatch = dispatch => {
  return {
    addRoomAction: obj => dispatch(addSubject(obj)),
    getAllStudents: () => dispatch(getStudents())
  }
}

export default connect(mapState, mapDispatch)(AddRoom)
