import React from 'react';
import './App.scss';
console.clear();

const perimeterDimensionPx = 200;
const objectDimensionPx = 50;
const moveButtonWidthPx = 100;
const moveDimensionPx = 20;

const Perimeter = ({ x, y }) => (
  <div>
    <div
      style={{
        height: `${objectDimensionPx}px`,
        width: `${objectDimensionPx}px`,
        backgroundColor: '#ff00bf',
        position: 'relative',
        left: x,
        top: y,
      }}
    />
  </div>
);

const MoveButton = ({ onClick }) => (
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
      x: (perimeterDimensionPx - objectDimensionPx) / 2,
      y: (perimeterDimensionPx - objectDimensionPx) / 2,
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          'grid-template-columns': `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
          'grid-template-rows': `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
        }}
      >
        <div />
        <MoveButton
          onClick={e => {
            this.setState({ y: Math.max(0, this.state.y - moveDimensionPx) });
          }}
        />
        <div />
        <MoveButton
          onClick={e => {
            this.setState({ x: Math.max(0, this.state.x - moveDimensionPx) });
          }}
        />
        <Perimeter x={this.state.x} y={this.state.y} />
        <MoveButton
          onClick={e => {
            this.setState({
              x: Math.min(
                this.state.x + moveDimensionPx,
                perimeterDimensionPx - objectDimensionPx
              ),
            });
          }}
        />
        <div />
        <MoveButton
          onClick={e => {
            this.setState({
              y: Math.min(
                this.state.y + moveDimensionPx,
                perimeterDimensionPx - objectDimensionPx
              ),
            });
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
