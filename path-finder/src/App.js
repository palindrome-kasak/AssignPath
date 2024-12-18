// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const GRID_SIZE = 20;

// function App() {
//   const [grid, setGrid] = useState(
//     Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("default"))
//   );
//   const [start, setStart] = useState(null);
//   const [end, setEnd] = useState(null);
//   const [path, setPath] = useState([]);

//   const handleCellClick = (row, col) => {
//     if (!start) {
//       setStart([row, col]);
//       updateGrid(row, col, "start");
//     } else if (!end) {
//       setEnd([row, col]);
//       updateGrid(row, col, "end");
//     }
//   };

//   const updateGrid = (row, col, type) => {
//     setGrid((prev) => {
//       const newGrid = [...prev];
//       newGrid[row][col] = type;
//       return newGrid;
//     });
//   };

//   const calculatePath = async () => {
//     if (start && end) {
//       try {
//         const response = await axios.post("http://localhost:5000/find-path", {
//           start,
//           end,
//         });
//         const calculatedPath = response.data.path;
//         setPath(calculatedPath);
//         highlightPath(calculatedPath);
//       } catch (error) {
//         console.error("Error calculating path:", error);
//       }
//     } else {
//       alert("Please select both start and end points.");
//     }
//   };

//   const highlightPath = (calculatedPath) => {
//     setGrid((prev) => {
//       const newGrid = [...prev];
//       for (const [row, col] of calculatedPath) {
//         newGrid[row][col] = "path";
//       }
//       return newGrid;
//     });
//   };

//   const resetGrid = () => {
//     setGrid(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("default")));
//     setStart(null);
//     setEnd(null);
//     setPath([]);
//   };

//   return (
//     <div className="App">
//       <h1>Grid Path Finder</h1>
//       <div className="grid">
//         {grid.map((row, rowIndex) =>
//           row.map((cell, colIndex) => (
//             <div
//               key={`${rowIndex}-${colIndex}`}
//               className={`cell ${cell}`}
//               onClick={() => handleCellClick(rowIndex, colIndex)}
//             ></div>
//           ))
//         )}
//       </div>
//       <div className="controls">
//         <button onClick={calculatePath}>Find Path</button>
//         <button onClick={resetGrid}>Reset</button>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const GRID_SIZE = 20;

// function App() {
//   const [grid, setGrid] = useState(
//     Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("default"))
//   );
//   const [start, setStart] = useState(null);
//   const [end, setEnd] = useState(null);
//   const [path, setPath] = useState([]);

//   const handleCellClick = (row, col) => {
//     if (!start) {
//       setStart([row, col]);
//       updateGrid(row, col, "start");
//     } else if (!end) {
//       setEnd([row, col]);
//       updateGrid(row, col, "end");
//     }
//   };

//   const updateGrid = (row, col, type) => {
//     setGrid((prev) => {
//       const newGrid = [...prev];
//       newGrid[row][col] = type;
//       return newGrid;
//     });
//   };

//   const calculatePath = async () => {
//     if (start && end) {
//       try {
//         const response = await axios.post("http://localhost:8080/find-path", {
//           start,
//           end,
//         });
//         const calculatedPath = response.data.path;
//         setPath(calculatedPath);
//         highlightPath(calculatedPath);
//       } catch (error) {
//         console.error("Error calculating path:", error);
//       }
//     } else {
//       alert("Please select both start and end points.");
//     }
//   };

//   const highlightPath = (calculatedPath) => {
//     setGrid((prev) => {
//       const newGrid = [...prev];
//       for (const [row, col] of calculatedPath) {
//         newGrid[row][col] = "path";
//       }
//       return newGrid;
//     });
//   };

//   const resetGrid = () => {
//     setGrid(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("default")));
//     setStart(null);
//     setEnd(null);
//     setPath([]);
//   };

//   return (
//     <div className="App">
//       <h1>Grid Path Finder</h1>
//       <div className="grid">
//         {grid.map((row, rowIndex) =>
//           row.map((cell, colIndex) => (
//             <div
//               key={`${rowIndex}-${colIndex}`}
//               className={`cell ${cell}`}
//               onClick={() => handleCellClick(rowIndex, colIndex)}
//             ></div>
//           ))
//         )}
//       </div>
//       <div className="controls">
//         <button onClick={calculatePath}>Find Path</button>
//         <button onClick={resetGrid}>Reset</button>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// const gridSize = 20;

// function App() {
//   const [start, setStart] = useState(null);
//   const [end, setEnd] = useState(null);
//   const [path, setPath] = useState([]); // Initialize path as an empty array

//   const handleTileClick = (x, y) => {
//     if (!start) {
//       setStart({ x, y });
//     } else if (!end) {
//       setEnd({ x, y });
//     }
//   };

//   const calculatePath = async () => {
//     if (start && end) {
//       try {
//         const response = await axios.post("http://127.0.0.1:8080/find-path", {
//           start,
//           end,
//         });
//         setPath(response.data.path); // Ensure path is set correctly
//       } catch (error) {
//         console.error("Error fetching path:", error);
//       }
//     }
//   };

//   const resetGrid = () => {
//     setStart(null);
//     setEnd(null);
//     setPath([]); // Reset path to an empty array
//   };

//   const renderGrid = () => {
//     const grid = [];
//     for (let y = 0; y < gridSize; y++) {
//       const row = [];
//       for (let x = 0; x < gridSize; x++) {
//         let cellClass = "cell";
//         if (start && start.x === x && start.y === y) {
//           cellClass = "start";
//         }
//         if (end && end.x === x && end.y === y) {
//           cellClass = "end";
//         }
//         if (path && path.length > 0 && path.some((p) => p.x === x && p.y === y)) {
//           cellClass = "path";
//         }
//         row.push(
//           <div
//             key={`${x}-${y}`}
//             className={cellClass}
//             onClick={() => handleTileClick(x, y)}
//           />
//         );
//       }
//       grid.push(
//         <div key={y} className="row">
//           {row}
//         </div>
//       );
//     }
//     return grid;
//   };

//   return (
//     <div className="app">
//       <h1>Path Finder</h1>
//       <div className="grid">{renderGrid()}</div>
//       <div className="controls">
//         <button onClick={calculatePath} disabled={!start || !end}>
//           Calculate Path
//         </button>
//         <button onClick={resetGrid}>Reset Grid</button>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [path, setPath] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleTileClick = (x, y) => {
    if (!startPoint) {
      setStartPoint({ x, y });
      setStatusMessage('Start point set. Click to set end point.');
    } else if (!endPoint) {
      setEndPoint({ x, y });
      setStatusMessage('Calculating path...');
      calculatePath(startPoint, { x, y });
    } else {
      setStartPoint({ x, y });
      setEndPoint(null);
      setPath([]);
      setStatusMessage('New start point set. Click to set end point.');
    }
  };

  const calculatePath = async (start, end) => {
    try {
      const response = await fetch('http://localhost:8080/find-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startX: start.x,
          startY: start.y,
          endX: end.x,
          endY: end.y,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.path || !Array.isArray(data.path)) {
        throw new Error('Invalid path data received from server');
      }

      setPath(data.path);
      setStatusMessage('Path calculated successfully.');
    } catch (error) {
      console.error('Error calculating path:', error.message);
      setPath([]);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Grid Pathfinder</h1>
      <p>{statusMessage}</p>
      <Grid
        size={20}
        startPoint={startPoint}
        endPoint={endPoint}
        path={path}
        onTileClick={handleTileClick}
      />
    </div>
  );
}

export default App;

