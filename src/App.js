import React from 'react';
import './App.scss';
console.clear();

const InnerBox = ({ x, y }) => (
  <div className="inner-box-container">
    <div
      style={{
        height: '5px',
        width: '5px',
        backgroundColor: '#ff00bf',
        position: 'relative',
        left: x,
        top: y,
      }}
    />
  </div>
);

class OuterGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 40,
      y: 40,
    };
  }

  render() {
    return (
      <div className="outer-grid">
        <div />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.y > 0) {
              this.setState({ y: this.state.y - 1 });
            }
          }}
        />
        <div />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.x > 0) {
              this.setState({ x: this.state.x - 1 });
            }
          }}
        />
        <InnerBox x={this.state.x} y={this.state.y} />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.x < 42) {
              this.setState({ x: this.state.x + 1 });
            }
          }}
        />
        <div />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.y < 42) {
              this.setState({ y: this.state.y + 1 });
            }
          }}
        />
      </div>
    );
  }
}

function App() {
  return <OuterGrid />;
}

export default App;
