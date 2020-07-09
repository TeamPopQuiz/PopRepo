import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createdQuiz, addedQuestion} from '../store/createQuiz'

export class createQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      quizName: '',
      date: '',
      threshold: 80,
      question: '',
      correctAnswer: '',
      wrongAnswer1: '',
      wrongAnswer2: '',
      wrongAnswer3: ''
    }
    this.handleInputChangeQuiz = this.handleInputChangeQuiz.bind(this)
    this.handleSubmitQuiz = this.handleSubmitQuiz.bind(this)
    this.handleInputChangeQuestions = this.handleInputChangeQuestions.bind(this)
    this.handleSubmitQuestions = this.handleSubmitQuestions.bind(this)
  }

  handleInputChangeQuiz(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmitQuiz(event) {
    event.preventDefault()
    let quiz = {
      quizName: this.state.quizName,
      date: this.state.date,
      threshold: this.state.threshold
    }
    this.props.createQuiz(quiz)
  }
  handleInputChangeQuestions(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmitQuestions(event) {
    event.preventDefault()
    let qAndA = {
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
      wrongAnswer1: this.state.wrongAnswer1,
      wrongAnswer2: this.state.wrongAnswer2,
      wrongAnswer3: this.state.wrongAnswer3
    }
    this.props.addQuestion(qAndA)
    this.setState({
      quizName: '',
      date: '',
      threshold: 80,
      question: '',
      correctAnswer: '',
      wrongAnswer1: '',
      wrongAnswer2: '',
      wrongAnswer3: ''
    })
  }

  render() {
    const {quiz} = this.props
    return quiz.quizName ? (
      <div className="form">
        <H1>Create Quiz</H1>
        <form onSubmit={this.handleSubmitQuiz}>
          <label>
            Quiz Name:
            <input
              type="text"
              name="quizName"
              onChange={this.handleInputChangeQuiz}
              value={this.state.quizName}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              onChange={this.handleInputChangeQuiz}
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
              onChange={this.handleInputChangeQuiz}
              value={this.state.threshold}
            />
          </label>
          <button type="submit">Create Quiz</button>
        </form>
      </div>
    ) : (
      <div className="form">
        <h3>Question and Answers</h3>
        <form onSubmit={this.handleSubmitQuestions}>
          <label>
            Question:
            <input
              type="text"
              name="question"
              onChange={this.handleInputChangeQuestions}
              value={this.state.question}
            />
          </label>
          <label>
            Correct Answer:
            <input
              type="text"
              name="correctAnswer"
              onChange={this.handleInputChangeQuestions}
              value={this.state.correctAnswer}
            />
          </label>
          <label>
            Wrong Answer 1:
            <input
              type="text"
              name="wrongAnswer1"
              onChange={this.handleInputChangeQuestions}
              value={this.state.wrongAnswer1}
            />
          </label>
          <label>
            Wrong Answer 2:
            <input
              type="text"
              name="wrongAnswer2"
              onChange={this.handleInputChangeQuestions}
              value={this.state.wrongAnswer2}
            />
          </label>
          <label>
            Wrong Answer 3:
            <input
              type="text"
              name="wrongAnswer3"
              onChange={this.handleInputChangeQuestions}
              value={this.state.wrongAnswer3}
            />
          </label>
          <button type="submit">Add Question</button>
        </form>
      </div>
      // <div className="form">

      // </div>
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
    createQuiz: quiz => dispatch(createdQuiz(quiz)),
    addQuestion: qAndA => dispatch(addedQuestion(qAndA))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createQuizForm)
