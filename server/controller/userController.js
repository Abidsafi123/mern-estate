import userModel from "../model/user.js";

export const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedUser) {
      // ✅ Only return updated user object
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
//delete 
 export const deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;

    // Use id directly
    const remove = await userModel.findByIdAndDelete(id);

    if (!remove) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
      data: remove,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
