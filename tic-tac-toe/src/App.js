import Card from "./Components/Card";

function App() {
  return (
    <div className="flex flex-col">
      <h1 className="text-7xl text-center">Tic Tac Toe</h1>
      <div className="h-96 border border-rose-500 w-80">
        <Card />
      </div>
    </div>
  );
}

export default App;

// h1 {
//   text-align: center;
//   font-size: 70px;
// }

// .main {
//   display: flex;
//   flex-direction: column;
// }

// .main_cards {
//   display: flex;
//   justify-content: center;
//   gap: 100px;
//   border: 1px solid red;



// .card {
//   height: 500px;
//   width: 400px;
//   background-color: #eee;
//   border-radius: 10px;
//   border: 1px solid #000;
// }

// }
