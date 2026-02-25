import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function formatDate(yyMMdd) {
  if (!yyMMdd || yyMMdd.length !== 6) return yyMMdd;
  const year = yyMMdd.slice(0, 2);
  const month = yyMMdd.slice(2, 4);
  const day = yyMMdd.slice(4, 6);
  return `${day}/${month}/${year}`;
}

function FitMapToMarkers({ events }) {
  const map = useMap();

  useEffect(() => {
    if (events.length === 0) return;
    const bounds = events.map(e => [e.lat, e.lon]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [events, map]);

  return null;
}

function EventList() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const fetchEvents = async (loc = '') => {
    try {
      const res = await fetch(`api/events${loc ? `?location=${loc}` : ''}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  useEffect(() => {
    fetchEvents(); 
  }, []);

  const handleSearch = () => {
    fetchEvents(location.trim());
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Available Events</h2>

      {/* Search */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location (e.g. London)"
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Map */}
      <div style={{
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem',
        border: '2px solid #444'
      }}>
        <MapContainer
          center={[51.5, -0.09]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map(e => (
            <Marker key={e.id} position={[e.lat, e.lon]}>
            <Popup>
              <div>
                <strong>{e.name}</strong><br />
                {e.location}<br />
                {formatDate(e.date)}<br />
                <button onClick={() => navigate(`/book/${e.id}`)} style={{ marginTop: "0.5rem" }}>
                  Book Tickets
                </button>
              </div>
            </Popup>
            </Marker>
          ))}
          <FitMapToMarkers events={events} />
        </MapContainer>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {events.map(e => (
          <div key={e.id} style={{
            background: '#333',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            flex: '1 1 250px',
            maxWidth: '300px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
          }}>
            <strong>{e.name}</strong><br />
            <span><strong>Location:</strong> {e.location}</span><br />
            <span><strong>Date:</strong> {formatDate(e.date)}</span><br />
            <button style={{ marginTop: '0.5rem' }} onClick={() => navigate(`/book/${e.id}`)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;