import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import EventList from "./EventList";
import TicketBooking from "./TicketBooking";
import AdminPanel from "./AdminPanel";
import Profile from "./Profile";
import Basket from "./Basket";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then(res => res.json())
      .then(data => { if (data.username) setUser(data.username); })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST", credentials: "include" }).then(() => setUser(null));
  };

  if (loading) return <div style={{padding: "2rem"}}>Loading EventEase...</div>;

  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4", fontFamily: "sans-serif" }}>
        {user && (
          <nav style={{ background: "#333", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => window.location.href="/events"}>EventEase</span>
            <div>
              <span style={{ marginRight: "1rem" }}>{user}</span>
              <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
            </div>
          </nav>
        )}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/events" /> : <Login setUser={setUser} />} />
            <Route path="/events" element={user ? <EventList /> : <Navigate to="/" />} />
            <Route path="/book/:eventID" element={user ? <TicketBooking /> : <Navigate to="/" />} />
            <Route path="/basket" element={user ? <Basket /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
            <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;