import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryPie
} from 'victory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div>
        <h3>Welcome, {email}</h3>
      </div>

      <div>
        <VictoryChart theme={VictoryTheme.material} domain={{y: [0, 10]}}>
          <VictoryGroup
            horizontal
            offset={10}
            style={{data: {width: 10}}}
            colorScale={['red', 'green']}
          >
            <VictoryBar
              data={[
                {x: 1, y: 3},
                {x: 2, y: 2},
                {x: 3, y: 1},
                {x: 4, y: 5},
                {x: 5, y: 3}
              ]}
            />
            <VictoryBar
              data={[
                {x: 1, y: 7},
                {x: 2, y: 8},
                {x: 3, y: 9},
                {x: 4, y: 5},
                {x: 5, y: 7}
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
      <div className="victoryLabel">
        <p>Number of Students</p>
      </div>

      <VictoryPie
        style={{
          data: {
            stroke: 'white',
            strokeWidth: 3
          },
          labels: {
            fontSize: 20,
            fill: 'black'
          }
        }}
        colorScale={['green', 'yellow', 'red']}
        data={[{x: '>80%', y: 40}, {x: '55-79%', y: 45}, {x: '<54%', y: 15}]}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
