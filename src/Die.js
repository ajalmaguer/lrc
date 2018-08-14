import React from 'react';
import {Component} from 'react';

var faces = ['L', 'R', 'C', '😀', '😊', '😄'];

export default class Die extends Component {

  constructor(props) {
    super(props);
    this.state = {
      faceValue: props.faceValue
    }
  }

  doneRolling = () => {
    this.props.doneRolling(this.props.diceNumber, this.state.faceValue);
  }

  getRandomFace = () => {
    const index = Math.floor(Math.random() * faces.length);
    return faces[index];
  }

  roll = () => {
    const times = Math.floor(Math.random() * 10 + 1);
    let i = 0;
    const interval = setInterval(() => {
      i++
      this.setState({
        ...this.state,
        faceValue: this.getRandomFace()
      })
      if (i >= times) {
        clearInterval(interval);
        this.doneRolling();
      }
    }, 100)
  }

  render() {
    return (
      <div className="col dice-container">
        <div className="dice">
          <div>{this.state.faceValue}</div>
        </div>
      </div>
    )
  }
};
