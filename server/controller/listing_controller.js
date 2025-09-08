import listingModel from "../model/listing.model.js"

export const createListing = async(req,res)=>{
    try {

   const listing = await listingModel.create(req.body);
   return res.status(201).json({listing});

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}