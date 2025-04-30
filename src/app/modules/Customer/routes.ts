

import express, { NextFunction, Request, Response } from 'express'
import { customerService } from './service'
import { customerController } from './controller'



const router = express.Router()


router.post(
    "/", customerController.createCustomer
)
router.get(
    "/", customerController.getAllCustomers
)
router.get(
    "/:id", customerController.getCustomerById
)
router.put(
    "/:id", customerController.updateCustomer
)
router.delete(
    "/:id", customerController.deleteCustomer
)

export const customerRoutes = router
