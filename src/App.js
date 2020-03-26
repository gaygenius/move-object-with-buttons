import React, { useState } from 'react';
import reactLogo from './logo.svg';
import './App.css';
console.clear();

const PositionedObject = ({ x, y, objectDimensionPx, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
        maxWidth: `${objectDimensionPx}px`,
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
        <PositionedObject x={x} y={y} objectDimensionPx={objectDimensionPx}>
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
    className="spin-logo"
    alt="logo"
    height={dimensionPx}
    width={dimensionPx}
  />
);

const OtherLogo = ({ dimensionPx }) => (
  <svg
    className="spin-logo"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 72 50"
    height={`${dimensionPx}px`}
    width={`${dimensionPx}px`}
  >
    <g fill="#ff00bf">
      <path d="M.023.888h10.912v28.716c0 4.544 2.12 7.251 3.796 8.411-1.775 1.547-7.198 2.901-11.24-.386C1.106 35.69.022 32.504.022 29.507V.888z"></path>
      <path d="M68.218 24.742v-3.018h3.328V11.137H67.89C66.488 4.781 60.717.018 53.815.018c-7.95 0-14.396 6.32-14.396 14.116v24.724c2.265.312 4.964-.04 7.26-1.906 2.384-1.938 3.467-5.124 3.467-8.122v-.91h5.45V17.333h-5.45v-3.199h.013c0-1.98 1.637-3.585 3.656-3.585 2.02 0 3.662 1.605 3.662 3.585v10.608c0 7.796 6.453 14.116 14.403 14.116V28.326c-2.019 0-3.662-1.605-3.662-3.584"></path>
      <path d="M26.89 11.137v15.537c0 .883-.746 1.597-1.667 1.597-.92 0-1.667-.714-1.667-1.597V11.137H12.759V29.41c0 3.288 1.137 7.445 6.31 8.799 5.18 1.355 8.185-1.45 8.185-1.45-.274 1.848-2.049 3.201-4.909 3.491-2.164.22-4.93-.483-6.31-1.063v9.681c3.517 1.017 7.236 1.345 10.877.653 6.606-1.257 10.775-6.671 10.775-13.874v-24.51H26.891z"></path>
    </g>
  </svg>
);

function App() {
  const objectDimensionPx = 50;
  const objects = [
    <OtherLogo dimensionPx={objectDimensionPx} />,
    <ColorfulSquare dimensionPx={objectDimensionPx} color="#ff00bf" />,
    <DimensionedLogo logo={reactLogo} dimensionPx={objectDimensionPx} />,
  ];
  const [objectIndex, setObjectIndex] = useState(0);
  return (
    <div
      style={{
        display: 'flex',
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
