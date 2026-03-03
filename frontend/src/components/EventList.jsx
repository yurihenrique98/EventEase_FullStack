import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function formatDate(yyMMdd) {
  if (!yyMMdd || yyMMdd.length !== 6) return yyMMdd;
  return `${yyMMdd.slice(4, 6)}/${yyMMdd.slice(2, 4)}/20${yyMMdd.slice(0, 2)}`;
}

function FitMapToMarkers({ events }) {
  const map = useMap();
  useEffect(() => {
    if (events.length > 0) {
      const bounds = events.map(e => [e.lat, e.lon]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [events, map]);
  return null;
}

function EventList() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [basketCount, setBasketCount] = useState(0);
  const navigate = useNavigate();

  const fetchEvents = (loc = '') => {
    fetch(`api/events${loc ? `?location=${loc}` : ''}`)
      .then(res => res.json())
      .then(setEvents);
  };

  useEffect(() => {
    fetchEvents();
    setBasketCount(JSON.parse(localStorage.getItem('basket') || '[]').length);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => navigate('/basket')} style={{ cursor: 'pointer', border: '1px solid #333', padding: '0.5rem' }}>
          🛒 Basket ({basketCount})
        </button>
        <button onClick={() => navigate('/profile')} style={{ cursor: 'pointer', border: '1px solid #333', padding: '0.5rem' }}>
          👤 Profile
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input style={{ flex: 1, padding: '0.5rem' }} placeholder="Search city..." value={location} onChange={e => setLocation(e.target.value)} />
        <button onClick={() => fetchEvents(location)}>Search</button>
      </div>

      <div style={{ height: '350px', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem', border: '2px solid #333' }}>
        <MapContainer center={[51.5, -0.09]} zoom={6} style={{ height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {events.map(e => (
            <Marker key={e.id} position={[e.lat, e.lon]}>
              <Popup>
                <strong>{e.name}</strong><br/>{formatDate(e.date)}<br/>
                <button onClick={() => navigate(`/book/${e.id}`)}>Tickets</button>
              </Popup>
            </Marker>
          ))}
          <FitMapToMarkers events={events} />
        </MapContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {events.map(e => (
          <div key={e.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ margin: '0 0 0.5rem' }}>{e.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>📍 {e.location}<br/>📅 {formatDate(e.date)}</p>
            <button style={{ width: '100%', padding: '0.5rem', cursor: 'pointer' }} onClick={() => navigate(`/book/${e.id}`)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EventList;