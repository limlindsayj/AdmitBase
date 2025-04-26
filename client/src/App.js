import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');

  // test call
  const apiCall = () => {
    axios.get('http://localhost:3001')
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('API call error:', error);
      });
  };

  // login call
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password
      });

      console.log(response.data);
      setLoginResult('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setLoginResult(`Login failed: ${error.response.data.message}`);
      } else {
        setLoginResult('Server error. Try again later.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test API and Login</h1>
      </header>
      <main style={{ padding: '20px' }}>
        {/* Test button */}
        <button onClick={apiCall}>
          Test API
        </button>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ marginTop: '30px' }}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '5px', width: '250px' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>Password:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '5px', width: '250px' }}
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <button type="submit">
              Login
            </button>
          </div>
        </form>

        {/* Result */}
        {loginResult && (
          <div style={{ marginTop: '20px' }}>
            {loginResult}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
