import React from 'react';
import Tile from './Tile';

function Grid({ size, startPoint, endPoint, path, onTileClick }) {
  const grid = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isStart = startPoint && startPoint.x === x && startPoint.y === y;
      const isEnd = endPoint && endPoint.x === x && endPoint.y === y;
      const isPath = path.some(point => point.x === x && point.y === y);

      grid.push(
        <Tile
          key={`${x}-${y}`}
          x={x}
          y={y}
          isStart={isStart}
          isEnd={isEnd}
          isPath={isPath}
          onClick={() => onTileClick(x, y)}
        />
      );
    }
  }

  return (
    <div className="grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${size}, 30px)`,
      gap: '1px'
    }}>
      {grid}
    </div>
  );
}

export default Grid;

