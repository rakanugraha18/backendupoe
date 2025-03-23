import mongoose from "mongoose";
import User from "../models/user.model.js";
import CustomError from "../utils/cumtom.error.js";
import bcrypt from "bcryptjs";

class UserService {
  async registerUser({ firstName, lastName, username, email, password }) {
    // 🔹 Cek apakah email atau username sudah digunakan
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new CustomError("Email atau username sudah digunakan", 400);
    }

    // 🔹 Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Simpan user baru di database
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new CustomError("Gagal membuat user", 500);
    }

    // 🔹 Pastikan password tidak dikembalikan
    return {
      id: newUser._id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
    };
  }

  async authenticateUser({ email, password }) {
    // 🔹 Cek apakah user ada di database
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // 🔹 Periksa password yang di-hash (TAMBAHKAN `await`)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 401);
    }

    // 🔹 Pastikan password tidak dikembalikan
    const userData = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };

    return userData;
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      // 🔹 Pastikan ID valid sebelum query
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new CustomError("Invalid user ID format", 400);
      }

      // 🔹 Cari user berdasarkan ID tanpa mengembalikan password
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      return user;
    } catch (error) {
      throw new CustomError(error.message || "Internal server error", 500);
    }
  }

  async authenticateOauthUser({
    oauthProvider,
    oauthId,
    email,
    firstName,
    lastName,
    avatar,
  }) {
    // 🔹 Cek apakah user ada di database
    const user = await User.findOne({ oauthId });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // 🔹 Pastikan password tidak dikembalikan
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };

    return userData;
  }
}

export default new UserService();
