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

const MoveButton = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'lightgray',
      cursor: 'pointer',
    }}
  />
);

const ObjectBoxContainer = ({
  perimeterDimensionPx,
  objectDimensionPx,
  moveButtonWidthPx,
  moveDimensionPx,
}) => {
  const initialPosition = (perimeterDimensionPx - objectDimensionPx) / 2;
  const [x, setX] = useState(initialPosition);
  const [y, setY] = useState(initialPosition);

  const resetInitialPosition = function() {
    setX(initialPosition);
    setY(initialPosition);
  };
  const moveUp = function() {
    setY(Math.max(0, y - moveDimensionPx));
  };
  const moveLeft = function() {
    setX(Math.max(0, x - moveDimensionPx));
  };
  const moveRight = function() {
    setX(
      Math.min(x + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
    );
  };
  const moveDown = function() {
    setY(
      Math.min(y + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
    );
  };
  const Space = () => <div />;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
        gridTemplateRows: `${moveButtonWidthPx}px ${perimeterDimensionPx}px ${moveButtonWidthPx}px`,
      }}
    >
      <Space />
      <MoveButton onClick={moveUp} />
      <Space />
      <MoveButton onClick={moveLeft} />
      <div onClick={resetInitialPosition}>
        <PositionedObject x={x} y={y} dimension={objectDimensionPx} />
      </div>
      <MoveButton onClick={moveRight} />
      <Space />
      <MoveButton onClick={moveDown} />
    </div>
  );
};

function App() {
  return (
    <ObjectBoxContainer
      perimeterDimensionPx={200}
      objectDimensionPx={50}
      moveButtonWidthPx={100}
      moveDimensionPx={20}
    />
  );
}

export default App;
