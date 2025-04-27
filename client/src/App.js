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
import ProtectedRoute from './components/features/ProtectedRoute.js'
import SubmitApplicationPage from './components/submitApplicationPage.js';
import { AuthProvider } from './contexts/hooks/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login-page"
            element={<LoginPage/>}
          />
          <Route
            path="/signup-page"
            element={<SignupPage/>}
          />
          <Route
            path="/college"
            element={<CollegePage/>}
          />
          <Route
            path="/submit-application"
            element={<ProtectedRoute element={<SubmitApplicationPage/>} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;