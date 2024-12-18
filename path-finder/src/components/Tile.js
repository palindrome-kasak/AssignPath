import React from 'react';

function Tile({ x, y, isStart, isEnd, isPath, onClick }) {
  let backgroundColor = 'white';
  if (isStart) backgroundColor = 'green';
  else if (isEnd) backgroundColor = 'red';
  else if (isPath) backgroundColor = 'yellow';

  return (
    <div
      className="tile"
      style={{
        width: '30px',
        height: '30px',
        backgroundColor,
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );
}

export default Tile;

