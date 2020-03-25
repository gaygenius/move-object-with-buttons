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

const MoveButton = ({ onClick, active }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'lightgray',
      cursor: 'pointer',
      ...(active && { border: '10px ridge #80bfff' }),
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
  const [activeButton, setActiveButton] = useState(null);

  const resetInitialPosition = function() {
    setX(initialPosition);
    setY(initialPosition);
    setActiveButton(null);
  };
  const moveUp = function() {
    setY(Math.max(0, y - moveDimensionPx));
    setActiveButton('up');
  };
  const moveLeft = function() {
    setX(Math.max(0, x - moveDimensionPx));
    setActiveButton('left');
  };
  const moveRight = function() {
    setX(
      Math.min(x + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
    );
    setActiveButton('right');
  };
  const moveDown = function() {
    setY(
      Math.min(y + moveDimensionPx, perimeterDimensionPx - objectDimensionPx)
    );
    setActiveButton('down');
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
      <MoveButton onClick={moveUp} active={activeButton === 'up'} />
      <Space />
      <MoveButton onClick={moveLeft} active={activeButton === 'left'} />
      <div onClick={resetInitialPosition}>
        <PositionedObject x={x} y={y} dimension={objectDimensionPx} />
      </div>
      <MoveButton onClick={moveRight} active={activeButton === 'right'} />
      <Space />
      <MoveButton onClick={moveDown} active={activeButton === 'down'} />
    </div>
  );
};

function App() {
  return (
    <ObjectBoxContainer
      perimeterDimensionPx={200}
      objectDimensionPx={50}
      moveButtonWidthPx={50}
      moveDimensionPx={20}
    />
  );
}

export default App;
