import userModel from "../model/user.js";
import listingModel from "../model/listing.model.js";
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
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // find all listings for that user
    const findUser = await listingModel.find({ userRef: id });

    if (!findUser || findUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Listing Found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      listings: findUser,
    });
  } catch (error) {
    console.error("Error in getUser:", error); // 👈 log actual error
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // optional: send error details in dev
    });
  }
};

export const getUser1 = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }
    const { password: pass, ...rest } = user._doc
    return res.status(200).json({
      success: true,
      user: rest
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error"
    })
  }
}
