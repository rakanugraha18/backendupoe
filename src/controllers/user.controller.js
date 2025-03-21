import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper untuk membuat token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🔹 Register user biasa
export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Validasi input
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Cek apakah email atau username sudah digunakan
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email atau username sudah digunakan" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Buat token
    const token = generateToken(newUser._id);

    // Simpan token di cookie yang aman
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // hanya secure di production
        sameSite: "strict",
      })
      .status(201)
      .json({ message: "User berhasil terdaftar", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
};

// 🔹 Login user biasa
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // 🔹 Gunakan Passport untuk membuat session login
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.json({ message: "Login berhasil!", user });
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// 🔹 OAuth login (Google)
export const oauthLogin = async (req, res) => {
  try {
    const { oauthProvider, oauthId, email, firstName, lastName, avatar } =
      req.body;

    if (!oauthProvider || !oauthId || !firstName || !lastName) {
      return res.status(400).json({ message: "Data OAuth tidak lengkap" });
    }

    let user = await User.findOne({ oauthId });

    if (!user) {
      // Periksa apakah email sudah ada sebelumnya
      const existingEmailUser = await User.findOne({ email });
      if (existingEmailUser) {
        return res
          .status(400)
          .json({ message: "Email sudah digunakan dengan metode lain" });
      }

      user = new User({
        oauthProvider,
        oauthId,
        email,
        firstName,
        lastName,
        avatar,
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Login dengan OAuth berhasil", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat login dengan OAuth" });
  }
};

// 🔹 Logout
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({ message: "Logout berhasil" });
};

// 🔹 Get Profile
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Silakan login terlebih dahulu" });
    }

    // req.user sudah diisi oleh passport
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil profil" });
  }
};
