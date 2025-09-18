import express from "express"
import  {createListing,removeListing}  from "../controller/listing_controller.js"
const router  = express.Router()
router.post('/create',createListing)
router.delete('/remove/:id',removeListing)
export default router;

