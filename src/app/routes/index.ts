
import express from 'express';
import { customerRoutes } from '../modules/Customer/routes';
import { bikeRoutes } from '../modules/Bike/routes';
import path from 'path';
import { serviceRoutes } from '../modules/Service/routes';


const router = express.Router();


const moduleRoutes:any[] = [
    {
        path: '/customers',
        route: customerRoutes
    },
    {
        path: '/bikes',
        route: bikeRoutes
    },
    {
        path: '/services',
        route: serviceRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router