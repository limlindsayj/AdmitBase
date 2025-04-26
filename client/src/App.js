import './App.css';
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './components/homePage.js';
import LoginPage from './components/loginPage.js';
import SignupPage from './components/signupPage.js';
import CollegePage from './components/collegePage.js';
import SubmitProfilePage from './components/submitProfilePage.js';

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
          path="/signup"
          element={<SignupPage/>}
        />
        <Route
          path="/college"
          element={<CollegePage/>}
        />
        <Route
          path="/submit"
          element={<SubmitProfilePage/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;