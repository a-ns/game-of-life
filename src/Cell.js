import React from "react";
class Cell extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item === this.props.item) return false;
    return true;
  }
  render() {
    return (
      <span
        style={{
          border: "1px solid black",
          width: this.props.dim + "px",
          height: this.props.dim + "px",
          backgroundColor: this.props.item === 0 ? "white" : "black"
        }}
      />
    );
  }
}

export default Cell;
