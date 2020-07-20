import React from 'react'
import {VictoryPie, VictoryLabel} from 'victory'

export default class QuizResultsPie extends React.Component {
  render() {
    let finalPieData, percentPerfect, scoreQuartiles
    if (this.props.allGrades) {
      //allGrades = quiz.studentGrades
      scoreQuartiles = [
        {x: '100%', y: 0},
        {x: '75-99%', y: 0},
        {x: '50-74%', y: 0},
        {x: '0-49%', y: 0}
      ]
      const allPerfectScores = this.props.allGrades.reduce(
        (cumGrades, currGradeRecord) => {
          let currScore =
            currGradeRecord.correctAnswers / currGradeRecord.numOfQuestions
          if (currScore < 0.5) {
            scoreQuartiles[3].y++
          } else if (currScore >= 0.5 && currScore < 0.75) {
            scoreQuartiles[2].y++
          } else if (currScore >= 0.75 && currScore < 1) {
            scoreQuartiles[1].y++
          } else if (currScore === 1) {
            scoreQuartiles[0].y++
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
      <div className="quiz-results-victory">
        <h2>Performance by Overall Score:</h2>
        <svg viewBox="0 0 600 600">
          <VictoryPie
            standalone={false}
            width={600}
            height={600}
            data={finalPieData}
            innerRadius={120}
            labelRadius={150}
            padding={{top: 25, bottom: 25}}
            labels={({datum}) => `${datum.x}: ${datum.y}`}
            style={{labels: {fontSize: 25, fill: 'white'}}}
            colorScale={['#264653', '#2A9D8F', '#F4A261', '#E76F51']}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{fontSize: 30}}
            x={300}
            y={300}
            padding={{bottom: 5}}
            text={this.props.quizName}
          />
        </svg>
        <div>
          {scoreQuartiles ? (
            <div>
              <p>{scoreQuartiles[3].y} students scored below 50%</p>
              <p>{scoreQuartiles[2].y} students scored between 50-75%</p>
              <p>{scoreQuartiles[1].y} students scored between 75-99%</p>
              <p>{scoreQuartiles[0].y} students scored 100%</p>{' '}
            </div>
          ) : (
            <p>No score data available!</p>
          )}
        </div>
      </div>
    )
  }
}
