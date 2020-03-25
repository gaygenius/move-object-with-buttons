import React, { useState } from 'react';
import reactLogo from './logo.svg';
import otherLogo from './otherLogo.svg';
import './App.css';
console.clear();

const PositionedObject = ({ x, y, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
      }}
    >
      {children}
    </div>
  );
};

const PositionedObjectContainer = ({
  perimeterDimensionPx,
  moveButtonWidthPx,
  moveDimensionPx,
  objectDimensionPx,
  children,
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
        <PositionedObject x={x} y={y}>
          {children}
        </PositionedObject>
      </div>
      <MoveButton direction="right" />
      <Space />
      <MoveButton direction="down" />
    </div>
  );
};

const ColorfulSquare = ({ dimensionPx, color }) => (
  <div
    style={{
      height: `${dimensionPx}px`,
      width: `${dimensionPx}px`,
      backgroundColor: color,
    }}
  />
);

const DimensionedLogo = ({ logo, dimensionPx }) => (
  <img
    src={logo}
    className="App-logo"
    alt="logo"
    height={dimensionPx}
    width={dimensionPx}
  />
);

function App() {
  const objectDimensionPx = 50;
  const objects = [
    <ColorfulSquare dimensionPx={objectDimensionPx} color="#ff00bf" />,
    <DimensionedLogo logo={reactLogo} dimensionPx={objectDimensionPx} />,
    <DimensionedLogo logo={otherLogo} dimensionPx={objectDimensionPx} />,
  ];
  const [objectIndex, setObjectIndex] = useState(0);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <PositionedObjectContainer
        perimeterDimensionPx={200}
        moveButtonWidthPx={50}
        moveDimensionPx={20}
        objectDimensionPx={objectDimensionPx}
      >
        {objects[objectIndex]}
      </PositionedObjectContainer>
      <button
        onClick={() => setObjectIndex((objectIndex + 1) % objects.length)}
        style={{
          margin: '50px',
          padding: '10px',
          fontWeight: '700',
          fontSize: 'x-large',
        }}
      >
        Switch
      </button>
    </div>
  );
}

export default App;
