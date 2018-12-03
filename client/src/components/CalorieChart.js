import React, { Component } from 'react'
import axios from 'axios'
import * as d3 from "d3";

const height = 200;
const width = 600;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

export default class CalorieChart extends Component {
  state={
    caloriesByDate: [],
  }

  xAxis = d3.axisBottom()
  yAxis = d3.axisLeft()

  static getDerivedStateFromProps(nextProps, prevState) {
    const {meals, allItems} = nextProps
    allItems.map((item) => {
    })

    var xScale = d3
      .scaleBand
    return { allItems, meals}
  }

  render() {

    return (
      <div>
        <svg width={width} height={height}>
        
        </svg>
      </div>
    )
  }
}
