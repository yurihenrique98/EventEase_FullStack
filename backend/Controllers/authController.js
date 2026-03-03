const UserDAO = require('../DAO/userDAO');
const BookingDAO = require('../DAO/BookingDAO');

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserDAO.findUser(username, password);
      if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });
      req.session.user = { id: user.id, username: user.username, isAdmin: user.isAdmin };
      res.json({ success: true, username: user.username, isAdmin: user.isAdmin });
    } catch (err) { res.status(500).json({ success: false }); }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  },

  getSession(req, res) {
    if (req.session.user) res.json({ loggedIn: true, username: req.session.user.username, isAdmin: req.session.user.isAdmin });
    else res.json({ loggedIn: false });
  },

  async getMyBookings(req, res) {
    try {
      const data = await BookingDAO.getUserBookings(req.session.user.username);
      res.json(data);
    } catch (err) { res.status(500).json({ error: "Failed" }); }
  },

  async changePassword(req, res) {
    const { newPassword } = req.body;
    const username = req.session.user?.username;
    if (!username) return res.status(401).json({ error: "Unauthorized" });
    try {
      await UserDAO.updatePassword(username, newPassword);
      res.json({ success: true });
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
  }
};