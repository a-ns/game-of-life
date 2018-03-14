import React from "react";
import styled from "styled-components";
const PickerForm = styled.form`
  width: 500px;
  margin: 0 auto;
`;
const Input = styled.input`
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 2px;
  border: none;
  background: #eceff1;
`;
const Label = styled.label`
  font-family: "Roboto";
`;
class RowColumnPicker extends React.Component {
  render() {
    return (
      <PickerForm>
        <Label>Columns</Label>
        <Input
          value={this.props.cols}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            this.props.changeColumns(Number(value));
          }}
        />
        <Label>Rows</Label>
        <Input
          value={this.props.rows}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "");
            this.props.changeRows(Number(value));
          }}
        />
      </PickerForm>
    );
  }
}

export default RowColumnPicker;
