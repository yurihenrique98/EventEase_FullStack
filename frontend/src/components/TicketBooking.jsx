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
      })
      .catch(err => {
        console.error("Error fetching ticket types:", err);
        alert("Failed to load ticket options.");
      });
  }, [eventID]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/events/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventID: parseInt(eventID), ticketType, quantity: parseInt(quantity) }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Booking confirmed!");
        navigate("/events");
      } else {
        alert("Booking failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error during booking.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Book Tickets for Event #{eventID}</h2>
      <form onSubmit={handleBooking}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Ticket Type: </label>
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
             {ticketTypes.map((t, i) => (
              <option key={i} value={t.ticketType}>
                {t.ticketType}
              </option>
            ))} 
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Quantity: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default TicketBooking;