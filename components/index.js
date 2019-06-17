import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSS from '../assets/css/styles.scss';
import MatchCard from './MatchCard';

//intersection shows the result, order is rock = 0, paper = 1, scissors = 2,
//t = tie, w = win, l = lose 
const results = [
  ['t', 'l', 'w'],
  ['w', 't', 'l'],
  ['l', 'w', 't'],
];

class App extends Component {
  state = {
    human: 0,
    cpu: 0,
    previousMatches: []
  }

  handleSelectOption = (e) => {
    const userInput = e.target.getAttribute('class') === 'rock' ? 0 : e.target.getAttribute('class') === 'paper' ? 1 : 2;
    const cpuInput = Math.floor(Math.random() * 3);

    this.setState((prevState) => {
      const result = results[userInput][cpuInput];
      const won = result === 'w' ? true : false;
      const draw = result === 't' ? true : false;

      if (!draw) {
        return {
          human: won ? prevState.human + 1 : prevState.human,
          cpu: !won ? prevState.cpu + 1 : prevState.cpu,
          previousMatches: [...prevState.previousMatches, { humanSelection: userInput, cpuSelection: cpuInput }]
        }
      }
      console.log('TIEEE!!');
      return prevState;
    });
  }

  renderPreviousMatches() {
    return this.state.previousMatches.map((match, index) => <MatchCard cpuSelection={match.cpuSelection} humanSelection={match.humanSelection} key={index} />);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.previousMatches.length === nextState.previousMatches.length ? false : true;
  }

  render() {
    return (
      //I know this can be refactor into multiple components, but is it necessary ?? when do we stop!!!!!???? :o 
      <div className="app">
        <h1>
          <span className="rock">&nbsp;Rock,</span>
          <span className="paper">&nbsp;Paper &</span>
          <span className="scissors">&nbsp;Scissors</span>
        </h1>
        <div className="options" onClick={this.handleSelectOption}>
          <img src="/assets/images/rock.png" className="rock" />
          <img src="/assets/images/paper.png" className="paper" />
          <img src="/assets/images/scissors.png" className="scissors" />
        </div>
        <div className="board">
          <div>Me <br />
            <span className="points">{this.state.human}</span>
          </div>
          <div className="hr hr-strong"></div>
          <div>CPU <br />
            <span className="points">{this.state.cpu}</span>
          </div>
        </div>
        {this.renderPreviousMatches()}
      </div>
    )
  }
}
let container = document.getElementById('app');
let component = <App />;

ReactDOM.render(component, container);