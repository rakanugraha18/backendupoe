import successResponse from "../utils/response.handler.js";
import CustomError from "../utils/cumtom.error.js";
import UserService from "../services/user.services.js";
class userController {
  // async register(req, res, next) {
  //   try {
  //     const { firstName, lastName, username, email, password } = req.body;

  //     // 🔹 Daftarkan user melalui service
  //     const user = await UserService.registerUser({
  //       firstName,
  //       lastName,
  //       username,
  //       email,
  //       password,
  //     });

  //     if (!user || !user.id) {
  //       throw new CustomError("User registration failed", 500);
  //     }

  //     // 🔹 Ambil hanya data yang dibutuhkan
  //     const userData = {
  //       id: user.id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       username: user.username,
  //       email: user.email,
  //     };

  //     console.log(
  //       "User Data (Before Response):",
  //       JSON.stringify(userData, null, 2)
  //     );
  //     res
  //       .status(201)
  //       .json(successResponse(userData, "User berhasil terdaftar", 201));
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async register(req, res, next) {
    try {
      const { firstName, lastName, username, email, password } = req.body;

      // 🔹 Daftarkan user melalui service
      const user = await UserService.registerUser({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      if (!user || !user.id) {
        throw new CustomError("User registration failed", 500);
      }

      // 🔹 Ambil hanya data yang dibutuhkan
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      };

      console.log(
        "User Data (Before Response):",
        JSON.stringify(userData, null, 2)
      );

      // 🔹 Auto login setelah register sukses
      req.login(user, (err) => {
        if (err) {
          return next(err); // 🔥 Tangani error login jika terjadi
        }
        res
          .status(201)
          .json(
            successResponse(userData, "User berhasil terdaftar dan login", 201)
          );
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserService.authenticateUser({ email, password });

      // 🔹 Gunakan Passport untuk membuat session login
      req.login(user, (err) => {
        if (err) {
          return next(err); // 🔹 Pastikan return agar tidak lanjut ke response berikutnya
        }

        // 🔹 Ambil hanya data yang dibutuhkan untuk response
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        };
        console.log(
          "User Data (Before Response):",
          JSON.stringify(userData, null, 2)
        );
        res.status(200).json(successResponse(userData, "Login berhasil", 200));
      });
    } catch (error) {
      next(error);
    }
  }

  // 🔹 Ambil profile user
  async getProfile(req, res, next) {
    try {
      // 🔹 Pastikan user sudah login
      if (!req.user || !req.user.id) {
        throw new CustomError("Unauthorized! Please login", 401);
      }

      // 🔹 Ambil user dari database tanpa password
      const user = await UserService.getUserById(req.user.id);

      // 🔹 Kirim response dengan data user
      return res
        .status(200)
        .json(successResponse(user, "User berhasil diambil", 200));
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, message: "Logout successful" });
    });
  }
}

export default new userController();
