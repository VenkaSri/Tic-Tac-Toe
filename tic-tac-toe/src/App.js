import Card from './Components/Card';
import './App.css';

function App() {
  return (
    <div className="main">
        <h1>Tic Tac Toe</h1>
        <div className="main_cards">
          <Card />
          <Card />
        </div>
    </div>
  );
}

export default App;
