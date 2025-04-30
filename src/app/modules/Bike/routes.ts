

import express from 'express'
import { bikeController } from './controller'


const router = express.Router()


router.post(
    "/", bikeController.createBike
)   
router.get(
    "/", bikeController.getAllBikes
)
router.get(
    "/:id", bikeController.getBikeById
)
router.put(
    "/:id", bikeController.updateBike
)
router.get(
    "/customer/:customerId", bikeController.getBikesByCustomerId
)
// router.delete(
//     "/:id", bikeController.deleteBike
// )

export const bikeRoutes = router