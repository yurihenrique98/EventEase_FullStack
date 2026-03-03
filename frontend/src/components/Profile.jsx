import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const [bookings, setBookings] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/auth/my-bookings', { credentials: 'include' })
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword) return alert("Enter a new password");
    const res = await fetch('/api/auth/change-password', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });
    if (res.ok) {
      alert("Password updated!");
      setNewPassword('');
    } else {
      alert("Update failed.");
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
        <h3>User Profile</h3>
        <p><strong>Username:</strong> {user}</p>
        <hr style={{ margin: '1.5rem 0' }} />
        <form onSubmit={handlePasswordChange}>
          <label style={{ fontSize: '0.8rem' }}>New Password</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: '0.5rem', cursor: 'pointer' }}>Update Password</button>
        </form>
        <button onClick={() => navigate('/events')} style={{ width: '100%', marginTop: '1rem' }}>Back</button>
      </div>
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px' }}>
        <h3>My Bookings</h3>
        {bookings.map(b => (
          <div key={b.id} style={{ padding: '1rem', border: '1px solid #eee', marginBottom: '1rem', borderRadius: '4px' }}>
            <strong>{b.eventName}</strong><br/>
            <small>{b.location} | {b.date}</small><br/>
            <b>{b.ticketType} x{b.quantity}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;