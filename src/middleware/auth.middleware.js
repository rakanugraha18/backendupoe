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
  // Middleware untuk memastikan user hanya bisa mengakses data miliknya sendiri
  static isSameUser(req, res, next) {
    const loggedInUserId = req.user._id?.toString();
    const requestedUserId = req.params.userId;

    if (loggedInUserId !== requestedUserId) {
      return res
        .status(403)
        .json({ message: "Kamu tidak punya akses ke data ini" });
    }

    next();
  }
}

export default AuthMiddleware;
