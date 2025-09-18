import express from "express"
import  {createListing,removeListing,editListing}  from "../controller/listing_controller.js"
const router  = express.Router()
router.post('/create',createListing)
router.delete('/remove/:id',removeListing)
router.post('/update/:id',editListing)
export default router;

