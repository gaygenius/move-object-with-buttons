import React from 'react';
import './App.scss';
console.clear();

const InnerBox = ({ x, y }) => (
  <div className="inner-box-container">
    <div
      style={{
        height: '20px',
        width: '20px',
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
      x: 100,
      y: 100,
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
              this.setState({ y: this.state.y - 10 });
            }
          }}
        />
        <div />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.x > 0) {
              this.setState({ x: this.state.x - 10 });
            }
          }}
        />
        <InnerBox x={this.state.x} y={this.state.y} />
        <div
          className="grid-button"
          onClick={e => {
            if (this.state.x < 180) {
              this.setState({ x: this.state.x + 10 });
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
