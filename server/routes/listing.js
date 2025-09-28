import express from "express"
import  {createListing,removeListing,editListing,getListing,getListings}  from "../controller/listing_controller.js"
const router  = express.Router()
router.post('/create',createListing)
router.delete('/remove/:id',removeListing)
router.post('/update/:id',editListing)
router.get('/get/:id',getListing)
router.get('/get',getListings)
export default router;

