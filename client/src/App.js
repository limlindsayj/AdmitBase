import axios from 'axios';
import './App.css';

function App() {
  
  //test call
  const apiCall = () => {
    axios.get('http://localhost:3001')  // Ensure this is localhost:3001, not localhost:3000
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('API call error:', error);  // Add a catch block for better error reporting
      });
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
