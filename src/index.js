import React, { Component } from 'react';
import { render } from 'react-dom';
import Die from './Die';
import Hand from './Hand';
import './style.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'Left Right Center',
      random: '',
      dice: [
        {
          value: '🎲',
          rolling: false,
        },
        {
          value: 'R',
          rolling: false,
        },
        {
          value: 'C',
          rolling: false,
        }
      ],
    };

    this.dice = [];
  }

  addDice = () => {
    const dice = [
      ...this.state.dice
    ]

    if (dice.length < 3) {
      dice.push({
        value: 'L',
        rolling: false
      })
    }

    this.setState({
      ...this.state,
      dice
    })
  }

  removeDice = () => {
    let dice = [
      ...this.state.dice
    ]

    if (dice.length > 1) {
      dice.pop()
      this.dice.pop();
    }

    this.setState({
      ...this.state,
      dice
    })
  }

  rollAllDice = () => {
    this.dice.forEach(die => {
      if (die) {
        die.roll();
      }
    })
    const dice = [
      ...this.state.dice
    ];

    dice.forEach(die => die.rolling = true);

    this.setState({
      ...this.state,
      dice
    });

  }

  doneRolling = (i, finalValue) => {
    const dice = [
      ...this.state.dice
    ];

    dice[i].rolling = false;
    dice[i].value = 'A';

    this.setState({
      ...this.state,
      dice
    });
  }

  roll = () => {
    if (this.state.rolling) {
      return
    }
    playSound();
    this.rollAllDice();

  }

  renderDice = () => {
    return this.state.dice.map((die, index) => (
      <Die
        key={index}
        diceNumber={index}
        faceValue={die.value}
        doneRolling={this.doneRolling}
        ref={c => this.dice[index] = c} />
    ));
  }

  areDiceRolling = () => {
    const output = this.state.dice.reduce((prev, current) => {
      return prev || current.rolling
    }, false);
    return output
  }

  render() {
    return (
      <div className="container text-center">
        <br />
        <h2>Left Right Center</h2>
        <div id="gameContainer">
          <div className="row">
            {this.renderDice()}
          </div>
          <Hand
            onRoll={this.roll}
            rolling={this.areDiceRolling()}
            addDice={this.addDice}
            removeDice={this.removeDice} />
        </div>
      </div>
    );
  }
}

function playSound() {
  const audio = document.getElementById('dice-sound');
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener('load', () => {
  render(<App />, document.getElementById('root'));
})