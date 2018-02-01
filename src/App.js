import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Cell from "./Cell";

const Container = styled.div`
  width: ${props => props.cols * props.dim + "px"};
  height: ${props => props.rows * props.dim + "px"};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
`;
function fillWithData(grid) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      grid[i][j] = Math.floor(Math.random() * Math.floor(2));
    }
  }
  return grid;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function computeNeighbors(grid, x, y) {
  let sum = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      sum +=
        grid[(x + i + grid.length) % grid.length][
          (y + j + grid[0].length) % grid[0].length
        ];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function computeNextState(state) {
  //  0 -> 3 live -> 1
  // 1 -> < 2 live || > 3 live -> 0
  const { grid, next } = state;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      let neighbors = computeNeighbors(grid, i, j);
      if (neighbors === 3 && grid[i][j] === 0) {
        next[i][j] = 1;
      } else if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = grid[i][j];
      }
    }
  }
  return { grid: next, next: grid };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: fillWithData(make2DArray(props.rows, props.cols)),
      next: make2DArray(props.rows, props.cols)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.rows != nextProps.rows ||
      this.props.cols != nextProps.cols
    ) {
      this.setState({
        grid: fillWithData(make2DArray(nextProps.cols, nextProps.rows)),
        next: make2DArray(nextProps.cols, nextProps.rows)
      });
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      //const nextState = computeNextState(this.state)
      //this.setState(nextState)
      this.setState(prevState => {
        return computeNextState(prevState);
      });
    }, 1000 / this.props.fps);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <Container {...this.props}>
        {this.state.grid.map((row, i) => {
          return row.map((item, j) => (
            <Cell dim={this.props.dim} item={item} key={`${i}${j}`} />
          ));
        })}
      </Container>
    );
  }
}

export default App;
