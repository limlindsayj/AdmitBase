import axios from 'axios';
import './App.css';

function App() {
  
  //test call
  const apiCall = () => {
    axios.get('http://localhost:8080').then((data) => {
      console.log(data);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <button onClick={apiCall}>
          Test
        </button>
      </main>
    </div>
  );
}

export default App;
