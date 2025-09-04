import express from "express"
import userModel from "../model/user.js";

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