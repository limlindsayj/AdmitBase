import './App.css';
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './components/homePage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<HomePage />}
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;