import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { injectGlobal } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";
import RowColumnPicker from "./RowColumnPicker";

class Container extends React.Component {
  state = {
    rows: 20,
    cols: 20,
    fps: 10,
    dim: 20,
    playing: true
  };
  changeRows = rows => {
    const dim = this.calculateDim(
      window.innerWidth,
      window.innerHeight,
      rows,
      this.state.cols
    );
    this.setState({ rows, dim });
  };
  changeColumns = cols => {
    const dim = this.calculateDim(
      window.innerWidth,
      window.innerHeight,
      this.state.rows,
      cols
    );
    this.setState({ cols, dim });
  };
  changeDim = dim => {
    this.setState({ dim });
  };
  calculateDim = (width, height, rows, cols) => {
    return (
      (height > width ? height : width) / (cols > rows ? cols : rows) * 0.3
    );
  };
  play = () => {
    this.setState({ playing: true });
  };
  pause = () => {
    this.setState({ playing: false });
  };
  componentDidMount() {
    this.changeDim(
      this.calculateDim(
        window.innerWidth,
        window.innerHeight,
        this.state.rows,
        this.state.cols
      )
    );
    window.addEventListener("resize", e => {
      e.preventDefault();
      const dim = this.calculateDim(
        window.innerWidth,
        window.innerHeight,
        this.state.rows,
        this.state.cols
      );
      this.changeDim(dim);
    });
  }
  render() {
    const dim = this.state.dim || 25;
    return (
      <Fragment>
        <RowColumnPicker
          {...this.state}
          playPause={this.state.playing ? this.pause : this.play}
          changeRows={this.changeRows}
          changeColumns={this.changeColumns}
        />
        <App {...this.state} dim={dim} />
      </Fragment>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
registerServiceWorker();
