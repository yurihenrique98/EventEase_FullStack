import { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
        console.log("Login successful:", data);
        setUser(data.username);
      } else {
        alert("Login failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error during login");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: '#333', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '300px' }}>
        <h2 style={{ marginBottom: '1rem', color: '#fff', textAlign: 'center' }}>Login</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block', width: '100%' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block', width: '100%' }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;