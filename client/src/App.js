import './App.css';
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './components/homePage.js';
import LoginPage from './components/loginPage.js';
import CollegePage from './components/collegePage.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/inpage"
          element={<LoginPage/>}
        />
        <Route
          path="/college"
          element={<CollegePage/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;