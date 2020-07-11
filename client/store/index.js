import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import subjects from './subject'
import students from './students'
import createQuiz from './createQuiz'
import quizTemplate from './quizTemplate'

const reducer = combineReducers({
  user,
  students,
  subjects,
  createQuiz,
  quizTemplate
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
