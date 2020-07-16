import React from 'react'
import {Col} from 'react-bootstrap/Col'
import {GoMarkGithub} from 'react-icons/go'
import {FaRegCopyright} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Footer = props => {
  return (
    <div>
      <footer className="footer">
        <span>
          <p>About Us</p>
          <p>Careers</p>
          <p>Pricing</p>
        </span>
        <span className="footer-description">
          <h10>
            An interactive educational platform where teachers can host pop
            quizzes for students, and receive detailed data on grades for the
            class, individual students, and rates of engagement.
          </h10>
        </span>
        <span>
          <h2>MindPop</h2>
          <FaRegCopyright size={23} />
          <h10>Copyright 2020</h10>{' '}
          <a href="http://rb.gy/pf6wvq">
            <GoMarkGithub color="black" size={32} />
          </a>
        </span>
      </footer>
    </div>
  )
}

export default Footer
