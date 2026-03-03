import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TicketBooking() {
  const { eventID } = useParams();
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/events/tickets/${eventID}`)
      .then(res => res.json())
      .then(data => {
        setTicketTypes(data);
        if (data.length > 0) setTicketType(data[0].ticketType);
      });
  }, [eventID]);

  const addToBasket = (e) => {
    e.preventDefault();
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const newItem = { eventID, ticketType, quantity: parseInt(quantity), id: Date.now() };
    basket.push(newItem);
    localStorage.setItem('basket', JSON.stringify(basket));
    alert("Added to basket!");
    navigate('/events');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Select Tickets</h2>
      <form onSubmit={addToBasket}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Type: </label>
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            {ticketTypes.map((t, i) => <option key={i} value={t.ticketType}>{t.ticketType} - £{t.price}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Qty: </label>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button type="submit" style={{ padding: '0.7rem 1.5rem', cursor: 'pointer', background: '#333', color: '#fff' }}>Add to Basket</button>
      </form>
    </div>
  );
}

export default TicketBooking;