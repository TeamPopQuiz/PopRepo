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
    console.log('This is rendering from QuizBar')
    return (
      <div className="question-bar">
        <h2>
          Correct answer percentage indicated by{' '}
          <font style={{color: '#E76F51'}}>red </font> bars, incorrect answer
          percentage indicated by{' '}
          <font style={{color: '#F4A261'}}>orange </font>{' '}
        </h2>
        <div className="victory-bar">
          <VictoryChart height={400} width={400} domainPadding={{x: 30, y: 20}}>
            <VictoryStack
              standalone={false}
              colorScale={['#F4A261', '#E76F51', 'gray']}
            >
              {console.log('Rendering from inside victory component')}
              {dataset.map((data, i) => {
                return <VictoryBar data={data} key={i} />
              })}
            </VictoryStack>
            <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
            <VictoryAxis tickFormat={tickFormat} />
          </VictoryChart>
        </div>
      </div>
    )
  }
}
