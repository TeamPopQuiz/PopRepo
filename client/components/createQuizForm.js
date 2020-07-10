import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createdQuiz, addedQuestion, submittedQuiz} from '../store/createQuiz'

export class createQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      quizName: '',
      date: '',
      threshold: 80,
      question: '',
      rightA: '',
      wrongA1: '',
      wrongA2: '',
      wrongA3: ''
    }
    this.handleInputChangeQuiz = this.handleInputChangeQuiz.bind(this)
    this.handleSubmitQuiz = this.handleSubmitQuiz.bind(this)
    this.handleInputChangeQuestions = this.handleInputChangeQuestions.bind(this)
    this.handleSubmitQuestions = this.handleSubmitQuestions.bind(this)
    this.handleSubmittedQuiz = this.handleSubmittedQuiz.bind(this)
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
      correctAnswer: this.state.rightA,
      wrongAnswer1: this.state.wrongA1,
      wrongAnswer2: this.state.wrongA2,
      wrongAnswer3: this.state.wrongA3
    }
    this.props.addQuestion(qAndA)
    this.setState({
      quizName: '',
      date: '',
      threshold: 80,
      question: '',
      rightA: '',
      wrongA1: '',
      wrongA2: '',
      wrongA3: ''
    })
  }
  handleSubmittedQuiz() {
    event.preventDefault()
    console.log('in handle submitted quiz')
    this.props.submitQuiz()
    this.setState({
      quizName: '',
      date: '',
      threshold: 80,
      question: '',
      rightA: '',
      wrongA1: '',
      wrongA2: '',
      wrongA3: ''
    })
  }

  render() {
    const {quiz, questions} = this.props
    console.log('this is the quiz from the store', quiz)
    console.log('qs from store', questions)
    return !quiz.quizName ? (
      <div className="form">
        <h1>Create Quiz</h1>
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
      <div>
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
                name="rightA"
                onChange={this.handleInputChangeQuestions}
                value={this.state.rightA}
              />
            </label>
            <label>
              Wrong Answer 1:
              <input
                type="text"
                name="wrongA1"
                onChange={this.handleInputChangeQuestions}
                value={this.state.wrongA1}
              />
            </label>
            <label>
              Wrong Answer 2:
              <input
                type="text"
                name="wrongA2"
                onChange={this.handleInputChangeQuestions}
                value={this.state.wrongA2}
              />
            </label>
            <label>
              Wrong Answer 3:
              <input
                type="text"
                name="wrongA3"
                onChange={this.handleInputChangeQuestions}
                value={this.state.wrongA3}
              />
            </label>
            <button type="submit">Add Question</button>
          </form>
        </div>
        <div className="formRight">
          <form onSubmit={this.handleSubmittedQuiz}>
            <h4>{quiz.quizName}</h4>
            <h5>{quiz.date}</h5>
            <ul>
              {questions.map(qA => (
                <div key={qA.id}>
                  <li>{qA.question}</li>
                  <ul>
                    <li>{qA.rightA}</li>
                    <li>{qA.wrongA1}</li>
                    <li>{qA.wrongA2}</li>
                    <li>{qA.wrongA3}</li>
                  </ul>
                </div>
              ))}
            </ul>
            <button type="submit">Submit Quiz</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.createQuiz.quiz,
    questions: state.createQuiz.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createQuiz: quiz => dispatch(createdQuiz(quiz)),
    addQuestion: qAndA => dispatch(addedQuestion(qAndA)),
    submitQuiz: () => dispatch(submittedQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createQuizForm)
