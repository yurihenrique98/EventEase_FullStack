import { useEffect, useState } from 'react';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);

  const loadData = () => {
    fetch('/api/events/admin/all-bookings', { credentials: 'include' })
      .then(res => res.json())
      .then(setBookings);
  };

  useEffect(() => { loadData(); }, []);

  const deleteBooking = (id) => {
    if (window.confirm("Delete booking?")) {
      fetch(`/api/events/admin/booking/${id}`, { method: 'DELETE', credentials: 'include' })
        .then(() => loadData());
    }
  };

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px' }}>
      <h2>Admin Dashboard - All Sales</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ padding: '0.5rem' }}>User</th>
            <th style={{ padding: '0.5rem' }}>Event</th>
            <th style={{ padding: '0.5rem' }}>Qty</th>
            <th style={{ padding: '0.5rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td style={{ padding: '0.5rem' }}>{b.username}</td>
              <td style={{ padding: '0.5rem' }}>{b.eventName}</td>
              <td style={{ padding: '0.5rem' }}>{b.quantity}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => deleteBooking(b.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminPanel;