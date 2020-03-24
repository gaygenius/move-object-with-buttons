import React from 'react';
import './App.scss';
console.clear();

const InnerBox = ({ x, y }) => (
  <div>
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

const PositionButton = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      'background-color': 'lightgray',
      cursor: 'pointer',
    }}
  />
);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 40,
      y: 40,
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          'grid-template-columns': '5px 50px 5px',
          'grid-template-rows': '5px 50px 5px',
        }}
      >
        <div />
        <PositionButton
          onClick={e => {
            if (this.state.y > 0) {
              this.setState({ y: this.state.y - 1 });
            }
          }}
        />
        <div />
        <PositionButton
          onClick={e => {
            if (this.state.x > 0) {
              this.setState({ x: this.state.x - 1 });
            }
          }}
        />
        <InnerBox x={this.state.x} y={this.state.y} />
        <PositionButton
          onClick={e => {
            if (this.state.x < 42) {
              this.setState({ x: this.state.x + 1 });
            }
          }}
        />
        <div />
        <PositionButton
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
  return <Container />;
}

export default App;
