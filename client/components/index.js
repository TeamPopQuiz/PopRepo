/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Footer} from './Footer'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleSubject} from './SingleSubject'
export {default as TeacherSubjects} from './TeacherSubjects'
export {default as QuizResults} from './quiz-results'
export {default as CreateQuizForm} from './createQuizForm'
export {default as TeacherHome} from './teacher-home'
export {default as StudentQuizView} from './StudentQuizView'
export {default as QuizQuestion} from './QuizQuestion'
export {default as LaunchQuiz} from './LaunchQuiz'
export {default as Homepage} from './homepage'
