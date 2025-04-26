import './App.css';
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './components/homePage.js';
import LoginPage from './components/loginPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<HomePage />}
        />
        <Route
          path="login"
          element={<LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;