import listingModel  from "../model/listing.model.js"

export const createListing = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body); // 👈 log the payload

    const listing = await listingModel.create(req.body);

    return res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("❌ Create Listing Error:", error); // 👈 log error details
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
