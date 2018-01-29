import React from 'react'
const dim = 25
// const Item = styled.span`
//   border: 1px solid black;
//   width: ${dim+'px'};
//   height: ${dim+'px'};
//   background-color: ${props => (props.item === 0 ? 'white': 'black')}
// `
class Cell extends React.Component {

    constructor(props) {
        super(props)
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.item === this.props.item) return false
        return true
    }
    render() {
        return <span style={{border: '1px solid black', width: this.props.dim + 'px', height: this.props.dim + 'px', backgroundColor: this.props.item === 0 ? 'white': 'black'}}></span>
    }
}

export default Cell