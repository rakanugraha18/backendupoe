class AuthMiddleware {
  static isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Silakan login terlebih dahulu" });
    }
    next();
  }

  static isGuest(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(403).json({ message: "Anda sudah login" });
    }
    next();
  }
}

export default AuthMiddleware;
