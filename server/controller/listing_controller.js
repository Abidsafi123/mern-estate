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
    console.error(" Create Listing Error:", error); // 👈 log error details
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}; 
export const removeListing = async(req,res)=>{
  const id = req.params.id;
  try {
    const listing = await listingModel.findById(id)
    if(!listing){
   return res.status(404).json({
      success:false,
      message:"Listing Not Found"
    })
    }
    // if(req.user.id !== listing.userRef){
    //   return res.status(401).json({
    //     success:false,
    //     message:'You are not authorised to delete listing!'
    //   })
    // }
 
    await listingModel.findByIdAndDelete(id)
    return res.status(201).json({
      success:true,
      message:"listing Deleted successfully"
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal server error",
      error:error.message
    })
    
  }
} 
export const editListing = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Find listing first
    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // // 2. (Optional) Check authorization
    // if (req.user && req.user.id !== listing.userRef.toString()) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "You are not authorized to update this listing",
    //   });
    // }

    // 3. Perform update
    const updatedListing = await listingModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // ✅ return updated doc, run schema validators
    );

    if (!updatedListing) {
      return res.status(400).json({
        success: false,
        message: "Listing update failed",
      });
    }

    // 4. Success
    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("Edit Listing Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
