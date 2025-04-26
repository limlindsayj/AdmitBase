import axios from 'axios';
import './App.css';

function App() {
  
  //test call
  const apiCall = () => {
    axios.get('http://localhost:8080').then(() => {
      console.log('woo');
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
