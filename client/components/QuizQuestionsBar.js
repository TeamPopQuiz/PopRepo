import React from 'react'
import {VictoryChart, VictoryStack, VictoryBar, VictoryAxis} from 'victory'

export default class QuizQuestionBar extends React.Component {
  // This is an example of a function you might use to transform your data to make 100% data
  transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y
      }, 0)
    })
    return dataset.map(data => {
      return data.map((datum, i) => {
        return {x: datum.x, y: datum.y / totals[i] * 100}
      })
    })
  }

  render() {
    const dataset = this.transformData(this.props.dataset)
    const tickFormat = []
    for (let i = 1; i < dataset[0].length + 1; i++) {
      tickFormat.push(`Q${i}`)
    }
    return (
      <div className="quiz-results-victory">
        <h2>Performance by Question:</h2>
        <p>
          Correct answer percentage indicated by{' '}
          <b style={{color: '#E76F51'}}>red </b> bars, incorrect or no-answer
          percentage indicated by <b style={{color: '#5E5D5C'}}>grey.</b>{' '}
        </p>
        <svg viewBox="0 0 300 185">
          <VictoryChart
            standalone={false}
            height={180}
            width={290}
            padding={{left: 30, bottom: 20}}
            domainPadding={{x: 30, y: 20}}
          >
            <VictoryStack colorScale={['#E76F51', '#5E5D5C']}>
              {dataset.map((data, i) => {
                return <VictoryBar barRatio={0.7} data={data} key={i} />
              })}
            </VictoryStack>
            <VictoryAxis
              dependentAxis
              style={{
                tickLabels: {fontSize: 8, padding: 5}
              }}
              tickFormat={tick => `${tick}%`}
            />
            <VictoryAxis
              style={{
                tickLabels: {fontSize: 8, padding: 5}
              }}
              tickFormat={tickFormat}
            />
          </VictoryChart>
        </svg>
      </div>
    )
  }
}
