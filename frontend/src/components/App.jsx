import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login.jsx";
import EventList from "../components/EventList.jsx";
import TicketBooking from "../components/TicketBooking.jsx";
import AdminPanel from "../components/AdminPanel.jsx"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      if (res.ok || res.status === 401) {
        setUser(null);
        window.location.href = "/";
      } else {
        console.error("Logout failed on server");
      }
    } catch (err) {
      console.warn("Logout network catch triggered, but redirecting to safety.");
      setUser(null);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include"
        });

        if (!res.ok) {
          console.warn("Session check failed:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Session data:", data);

        if (data?.username) {
          setUser(data.username);
        }
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {user && (
      <div style={{ position: "fixed", top: 6, left: 5, background: "transparent", zIndex: 1000, display: "flex", alignItems: "center", width: "100%",}}>
          Logged in as <strong style={{ marginLeft: "0.5rem" }}> {user} </strong>
          <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
            Logout
          </button>
        </div>
      )}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/events" /> : <Login setUser={setUser} />} />
        <Route path="/events" element={user ? <EventList /> : <Navigate to="/" />} />
        <Route path="/book/:eventID" element={user ? <TicketBooking /> : <Navigate to="/" />} />
        <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;