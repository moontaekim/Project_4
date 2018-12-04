import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import * as d3 from "d3";

const StyledProgressbar = styled.svg`
  background:black;

`
const StyledCalGoal = styled.span`
  float: right;
`
const height = 70;
const width = 400;

export default class CalorieChart extends Component {
  state = {
    caloriesByDate: [],
  }

  xAxis = d3.axisBottom()

  static getDerivedStateFromProps(nextProps, prevState) {
    const { meals, allItems, selectedDate, calGoal } = nextProps


    const mealId = meals.map((meal) => {
      if (meal.date === selectedDate) {
        return meal.id
      }
    })

    const mealItem = allItems.map((items) => {
      const itemCalories = items.map((item) => {
        if (mealId.includes(item.meal_id) === true) {
          return item.nf_calories * item.servings
        }
      })
      return itemCalories
    }
    )

    const totalCals = mealItem.map((items) => {
      const calArr = items.reduce((acc, curr) => 
      acc + curr, 0 )
      return calArr
    })

    const nullCheck = totalCals.map((i)=> {
      i = i || 0
      return i
    })

    const totalDailyCal = nullCheck.reduce((acc, curr) => 
    acc + curr, 0 )

    var xScale = d3
      .scaleLinear()
      .domain([0, calGoal])
      .range([0, width])

    return { allItems, meals, selectedDate, totalDailyCal, xScale }
  }

  render() {
    return (
      <div>
        <StyledProgressbar width={width} height={height}>
          <rect width={this.state.xScale(this.state.totalDailyCal)} height={height} fill="red"></rect>
        </StyledProgressbar>
      </div>
    )
  }
}
