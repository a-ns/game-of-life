import React from "react";
import styled from "styled-components";
const Presenter = styled.span`
  border: 1px solid black;
  width: ${props => props.dim + "px"};
  height: ${props => props.dim + "px"};
  background-color: ${props => (props.item === 0 ? "white" : "black")};
`;
class Container extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.dim !== this.props.dim) return true;
    if (nextProps.item === this.props.item) return false;
    return true;
  }
  render() {
    return <Presenter {...this.props} />;
  }
}

export default Container;
