import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Automata from "./Automata";

const GridContainer = styled.div`
  width: ${props => props.cols * props.dim + "px"};
  height: ${props => props.rows * props.dim + "px"};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
`;

class App extends React.Component {
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
      this.props.rows !== nextProps.rows ||
      this.props.cols !== nextProps.cols
    ) {
      let automata = new Automata(nextProps.rows, nextProps.cols);
      let { grid, nextGrid } = automata;
      this.setState({
        automata,
        grid,
        nextGrid
      });
    }
    if (!this.props.playing && nextProps.playing) {
      this.start();
    } else if (this.props.playing && !nextProps.playing) {
      this.pause();
    }
  }
  componentDidMount() {
    this.start();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  start() {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        return prevState.automata.next();
      });
    }, 1000 / this.props.fps);
  }
  pause() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <GridContainer {...this.props}>
        {this.state.grid.map((row, i) => {
          return row.map((item, j) => (
            <Cell dim={this.props.dim} item={item} key={`${i}${j}`} />
          ));
        })}
      </GridContainer>
    );
  }
}

export default App;
