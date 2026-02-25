const UserDAO = require('../DAO/userDAO');

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await UserDAO.findUser(username, password);
      if (!user) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }

      req.session.user = {
        id: user.id, username: user.username, isAdmin: user.isAdmin
      };

      res.json({
        success: true, username: user.username, isAdmin: user.isAdmin, message: "Login successful"
      });
    } catch (err) {
      console.error("Login failed:", err);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  },

  logout(req, res) {
   req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie('connect.sid'); 
    return res.json({ success: true, message: "Logged out successfully" });
  });
  },

  getSession(req, res) {
    if (req.session.user) {
      res.json({ loggedIn: true, username: req.session.user.username });
    } else {
      res.json({ loggedIn: false });
    }
  }
};