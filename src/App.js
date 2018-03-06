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
    this.state = {
      automata: new Automata(props.rows, props.cols)
    };
    this.state.grid = this.state.automata.grid;
    this.state.nextGrid = this.state.automata.nextGrid;
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.rows != nextProps.rows ||
      this.props.cols != nextProps.cols
    ) {
      this.setState({
        automata: new Automata(nextProps.rows, nextProps.cols)
      });
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        return this.state.automata.next();
      });
    }, this.props.fps);
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
