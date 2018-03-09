import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Automata from "./Automata";

const Container = styled.div`
  width: ${props => props.cols * props.dim + "px"};
  height: ${props => props.rows * props.dim + "px"};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
`;

class App extends Component {
  constructor(props) {
    super(props);
    let automata = new Automata(props.rows, props.cols);
    let { grid, nextGrid } = automata;
    this.state = {
      automata,
      grid,
      nextGrid
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.rows != nextProps.rows ||
      this.props.cols != nextProps.cols
    ) {
      let automata = new Automata(nextProps.rows, nextProps.cols);
      let { grid, nextGrid } = automata;
      this.setState({
        automata,
        grid,
        nextGrid
      });
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        return prevState.automata.next();
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
