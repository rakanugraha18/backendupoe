export const authMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Silakan login terlebih dahulu" });
  }

  next();
};
