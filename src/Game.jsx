/* eslint-disable react/prop-types */
import './Game.css'
import { useState } from 'react'

function Square({ value, onSquareClick }) { // Erstellen einer Funktion Square mit den Parametern value und onSquareClick
  return ( // Rückgabe eines HTML-Elements
    <button className="square" onClick={onSquareClick}> {/* Erstellen eines Buttons mit der Klasse square und dem Event-Listener onClick, der die Funktion onSquareClick aufruft */}
      {value} {/* Anzeigen des Wertes des value-Parameters */}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { // Erstellen einer Funktion Board mit den Parametern xIsNext, squares und onPlay
  function handleClick(i) { // Erstellen einer Funktion handleClick mit dem Parameter i
    if (calculateWinner(squares) || squares[i]) { // Wenn die Funktion calculateWinner mit dem Parameter squares oder squares[i] wahr ist
      return; // Die Funktion wird beendet
    }
    const nextSquares = squares.slice(); // Erstellen einer Konstanten nextSquares, die eine Kopie des squares-Arrays ist
    if (xIsNext) {  // Wenn xIsNext wahr ist
      nextSquares[i] = 'X'; // Das i-te Element des nextSquares-Arrays wird auf 'X' gesetzt
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares); // Die Funktion onPlay wird mit dem Parameter nextSquares aufgerufen
  }

  const winner = calculateWinner(squares); // Erstellen einer Konstanten winner, die das Ergebnis der Funktion calculateWinner mit dem Parameter squares ist
  let status; // Erstellen einer Variablen status
  if (winner) { // Wenn winner wahr ist
    status = 'Winner: ' + winner; // Die Variable status wird auf 'Winner: ' + winner gesetzt
  } else { // Wenn winner falsch ist
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Die Variable status wird auf 'Next player: ' + (xIsNext ? 'X' : 'O') gesetzt
  }

  return ( // Rückgabe eines HTML-Elements
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() { // Erstellen einer Funktion Game
  const [history, setHistory] = useState([Array(9).fill(null)]); // Erstellen einer State-Variable history, die ein Array mit 9 null-Elementen ist
  const [currentMove, setCurrentMove] = useState(0); // Erstellen einer State-Variable currentMove, die 0 ist
  const xIsNext = currentMove % 2 === 0; // Erstellen einer Konstanten xIsNext, die wahr ist, wenn currentMove modulo 2 gleich 0 ist
  const currentSquares = history[currentMove]; // Erstellen einer Konstanten currentSquares, die das currentMove-te Element des history-Arrays ist

  function handlePlay(nextSquares) { // Erstellen einer Funktion handlePlay mit dem Parameter nextSquares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Erstellen einer Konstanten nextHistory, die ein Array ist, das aus einer Kopie des history-Arrays besteht, die bis zum currentMove-ten Element reicht, und dem nextSquares-Array
    setHistory(nextHistory); // Die Funktion setHistory wird mit dem Parameter nextHistory aufgerufen
    setCurrentMove(nextHistory.length - 1); // Die Funktion setCurrentMove wird mit dem Parameter nextHistory.length - 1 aufgerufen
  }

  function jumpTo(nextMove) { // Erstellen einer Funktion jumpTo mit dem Parameter nextMove
    setCurrentMove(nextMove); // Die Funktion setCurrentMove wird mit dem Parameter nextMove aufgerufen
  }

  const moves = history.map((squares, move) => { // Erstellen einer Konstanten moves, die das Ergebnis des history-Arrays ist, das durch die Funktion map iteriert wird
    let description; // Erstellen einer Variablen description
    if (move > 0) { // Wenn move größer als 0 ist
      description = 'Go to move #' + move; // Die Variable description wird auf 'Go to move #' + move gesetzt
    } else {
      description = 'Go to game start';
    }
    return ( // Rückgabe eines HTML-Elements
      <li key={move}> {/* Erstellen eines Listen-Elements mit dem Schlüssel move */}
        <button className="button" onClick={() => jumpTo(move)}>{description}</button> {/* Erstellen eines Buttons mit der Klasse button und dem Event-Listener onClick, der die Funktion jumpTo mit dem Parameter move aufruft */}
      </li>
    );
  });

  return ( // Rückgabe eines HTML-Elements
    <div className="game"> {/* Erstellen eines div-Elements mit der Klasse game */}
      <div className="game-board"> {/* Erstellen eines div-Elements mit der Klasse game-board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> {/* Erstellen eines Board-Elements mit den Parametern xIsNext, squares und onPlay */}
      </div>
      <div className="game-info"> {/* Erstellen eines div-Elements mit der Klasse game-info */}
        <ol>{moves}</ol> {/* Erstellen einer geordneten Liste mit den Elementen der Konstanten moves */}
      </div>
    </div>
  );
}

function calculateWinner(squares) { // Erstellen einer Funktion calculateWinner mit dem Parameter squares
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { // Iteriere über die lines
    const [a, b, c] = lines[i]; // Erstellen einer Konstanten [a, b, c], die die i-te Zeile der lines ist
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // Wenn squares[a] und squares[a] gleich squares[b] und squares[a] gleich squares[c] sind
      return squares[a]; // Gebe squares[a] zurück
    }
  }
  return null; 
}