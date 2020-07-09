import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createdQuiz} from '../store/createQuiz'

export class createQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      quizName: '',
      date: '',
      threshold: 80
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let quiz = {
      quizName: this.state.quizName,
      date: this.state.date,
      threshold: this.state.threshold
    }
    console.log('this is the quiz', quiz)
    this.props.createQuiz(quiz)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Quiz Name:
          <input
            type="text"
            name="quizName"
            onChange={this.handleInputChange}
            value={this.state.quizName}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            onChange={this.handleInputChange}
            value={this.state.date}
          />
        </label>
        <label>
          Threshold:
          <input
            type="number"
            min="1"
            max="100"
            name="threshold"
            onChange={this.handleInputChange}
            value={this.state.theshold}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.createQuiz.quiz
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createQuiz: quiz => dispatch(createdQuiz(quiz))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createQuizForm)
