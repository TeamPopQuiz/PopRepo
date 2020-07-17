import React from 'react'
import {VictoryPie, VictoryLabel} from 'victory'

export default class QuizResultsPie extends React.Component {
  render() {
    let finalPieData, percentPerfect, scoreQuartiles
    if (this.props.allGrades) {
      //allGrades = quiz.studentGrades
      scoreQuartiles = [
        {x: 'Under 50%', y: 0},
        {x: '50-75%', y: 0},
        {x: '75-99%', y: 0},
        {x: '100%', y: 0}
      ]
      const allPerfectScores = this.props.allGrades.reduce(
        (cumGrades, currGradeRecord) => {
          let currScore =
            currGradeRecord.correctAnswers / currGradeRecord.numOfQuestions
          if (currScore < 0.5) {
            scoreQuartiles[0].y++
          } else if (currScore >= 0.5 && currScore < 0.75) {
            scoreQuartiles[1].y++
          } else if (currScore >= 0.75 && currScore < 1) {
            scoreQuartiles[2].y++
          } else if (currScore === 1) {
            scoreQuartiles[3].y++
            return cumGrades + currScore
          }
          return cumGrades
        },
        0
      )
      percentPerfect = allPerfectScores / this.props.allGrades.length
      finalPieData = scoreQuartiles.filter(category => category.y !== 0)
    }
    return (
      <div>
        <svg viewBox="0 0 300 300">
          <VictoryPie
            standalone={false}
            width={200}
            height={200}
            data={finalPieData}
            innerRadius={25}
            labelRadius={30}
            labels={({datum}) => `${datum.x}: ${datum.y}`}
            style={{labels: {fontSize: 4, fill: 'white'}}}
            colorScale={['#264653', '#2A9D8F', '#E9C46A', '#E76F51']}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{fontSize: 8}}
            x={100}
            y={100}
            text={this.props.quizName}
          />
        </svg>
        <div>
          {scoreQuartiles ? (
            <div>
              <h2>{scoreQuartiles[0].y} students scored below 50%</h2>
              <h2>{scoreQuartiles[1].y} students scored between 50-75%</h2>
              <h2>{scoreQuartiles[2].y} students scored between 75-99%</h2>
              <h2>{scoreQuartiles[3].y} students scored 100%</h2>{' '}
            </div>
          ) : (
            <h2>No score data available!</h2>
          )}
        </div>
      </div>
    )
  }
}
