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
    return (
      <div>
        <VictoryChart height={400} width={400} domainPadding={{x: 30, y: 20}}>
          <VictoryStack colorScale={['black', 'blue', 'tomato']}>
            {dataset.map((data, i) => {
              return <VictoryBar data={data} key={i} />
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
          <VictoryAxis
            tickFormat={[
              'Q1',
              'Q2',
              'Q3',
              'Q4',
              'Q5',
              'Q6',
              'Q7',
              'Q8',
              'Q9',
              'Q10'
            ]}
          />
        </VictoryChart>
      </div>
    )
  }
}
