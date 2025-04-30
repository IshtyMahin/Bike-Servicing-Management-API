



import express from 'express'
import { serviceController } from './controller'
import validateRequest from '../../middleWares/validateRequest'
import { ServiceValidation } from './validation'



const router = express.Router()
router.get(
    "/status", serviceController.getPendingOrOverdueServices
)
router.post(
    "/",validateRequest(ServiceValidation.createServiceZodSchema), serviceController.createService
)

router.get(
    "/", serviceController.getAllServices
)
router.get(
    "/:id", serviceController.getServiceById
)
router.put(
    "/:id/complete",validateRequest(ServiceValidation.updateServiceZodSchema), serviceController.updateService
)


export const serviceRoutes = router
