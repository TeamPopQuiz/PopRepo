import React, {Component} from 'react'

export default class AddRoom extends Component {
  constructor() {
    super()

    this.state = {
      subjectName: '',
      subjectCode: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {}

  render() {
    return (
      <div>
        <h2>Add New Room</h2>
        <form>
          <input
            type="text"
            name="subjectName"
            onChange={this.handleChange}
            vlaue={this.state.subjectName}
            placeholder="Subject Name"
          />
          <input
            type="text"
            name="subjectCode"
            onChange={this.handleChange}
            vlaue={this.state.subjectCode}
            placeholder="Subject Code"
          />
        </form>
      </div>
    )
  }
}
