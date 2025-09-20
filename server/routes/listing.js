import express from "express"
import  {createListing,removeListing,editListing,getListing}  from "../controller/listing_controller.js"
const router  = express.Router()
router.post('/create',createListing)
router.delete('/remove/:id',removeListing)
router.post('/update/:id',editListing)
router.get('/get/:id',getListing)
export default router;

