import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Basket() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('basket') || '[]'));
  }, []);

  const checkout = async () => {
    for (const item of items) {
      await fetch("/api/events/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(item),
      });
    }
    localStorage.removeItem('basket');
    alert("Bookings Confirmed!");
    navigate('/profile');
  };

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px' }}>
      <h2>Shopping Basket</h2>
      {items.length === 0 ? <p>Your basket is empty.</p> : (
        <div>
          {items.map((item, idx) => (
            <div key={idx} style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
              Event ID #{item.eventID} - {item.ticketType} (x{item.quantity})
            </div>
          ))}
          <button onClick={checkout} style={{ marginTop: '2rem', padding: '1rem', background: 'green', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Confirm All Bookings
          </button>
        </div>
      )}
      <button onClick={() => navigate('/events')} style={{ marginTop: '1rem' }}>Back to Events</button>
    </div>
  );
}
export default Basket;