import React from 'react';
import { Component } from 'react';

export default class Hand extends Component {

  roll = (e) => {
    e.preventDefault();
    clearSelection();
    this.props.onRoll();
  }

  getEmoji = () => {
    if (this.props.rolling) {
      return '👋';
    } else {
      return '✊';
    }
  }

  render() {
    return (
      <div id="hand-container">
        <div id="hand" onClick={this.roll} className="">
        {this.getEmoji()}
      </div>
        <div>
          <button type="button" onClick={this.props.removeDice} className="btn btn-light">Remove</button>
          <button type="button" onClick={this.roll} className="btn btn-light">Roll!</button>
          <button type="button" onClick={this.props.addDice} className="btn btn-light">Add</button>
        </div>
      </div>
    )
  }
}


function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}