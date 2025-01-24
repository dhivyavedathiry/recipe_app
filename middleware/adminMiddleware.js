const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    res.status(403).json({ error: 'Access denied. Admins only.' });
  };
  
  module.exports = isAdmin;
  