import React, { useState } from 'react';
console.clear();

const PositionedObject = ({ x, y, dimension }) => (
  <div
    style={{
      height: `${dimension}px`,
      width: `${dimension}px`,
      backgroundColor: '#ff00bf',
      position: 'relative',
      left: x,
      top: y,
    }}
  />
);

const PositionedObjectContainer = ({
  perimeterDimensionPx,
  objectDimensionPx,
  moveButtonWidthPx,
  moveDimensionPx,
}) => {
  const initialPosition = (perimeterDimensionPx - objectDimensionPx) / 2;
  const [x, setX] = useState(initialPosition);
  const [y, setY] = useState(initialPosition);
  const [activeButton, setActiveButton] = useState(null);

  const moveActions = {
    reset: function() {
      setX(initialPosition);
      setY(initialPosition);
    },
    up: function() {
      setY(Math.max(0, y - moveDimensionPx));
    },
    left: function() {
      setX(Math.max(0, x - moveDimensionPx));
    },
    right: function() {
      setX(
        Math.min(x + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
      );
    },
    down: function() {
      setY(
        Math.min(y + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
      );
    },
  };
  const Space = () => <div />;

  const MoveButton = ({ direction }) => (
    <div
      onClick={() => {
        moveActions[direction]();
        setActiveButton(direction);
      }}
      style={{
        backgroundColor: 'lightgray',
        cursor: 'pointer',
        ...(activeButton === direction && { border: '10px ridge #80bfff' }),
      }}
    />
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
        gridTemplateRows: `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
      }}
    >
      <Space />
      <MoveButton direction="up" />
      <Space />
      <MoveButton direction="left" />
      <div
        onClick={() => {
          moveActions.reset();
          setActiveButton(null);
        }}
      >
        <PositionedObject x={x} y={y} dimension={objectDimensionPx} />
      </div>
      <MoveButton direction="right" />
      <Space />
      <MoveButton direction="down" />
    </div>
  );
};

function App() {
  return (
    <PositionedObjectContainer
      perimeterDimensionPx={200}
      objectDimensionPx={50}
      moveButtonWidthPx={50}
      moveDimensionPx={20}
    />
  );
}

export default App;
