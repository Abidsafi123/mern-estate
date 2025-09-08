 import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // hashed the password
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exist!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // compare password
    const passwordCompare = await bcrypt.compare(password, existingUser.password);
    if (!passwordCompare) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "User Login Successful!",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const google = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      // Existing user
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      // New user
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatePassword, 10);

      const newUser = new userModel({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar, // ✅ fixed (was photo)
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc; // ✅ fixed (was user._doc)
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update user profile
// backend/controllers/userController.js
export const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;

    // req.body contains fields to update
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: req.body }, // update with data sent from frontend
      { new: true }       // return updated document
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "User Updated Successfully!",
        user: updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
