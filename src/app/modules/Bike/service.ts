
import { Bike } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";


const createBike = async (bike: Bike) => {

    const customerData = await prisma.customer.findUnique({
        where: {
            customerId: bike.customerId
        }
    })

    if (!customerData) {
        throw new ApiError(404,"Customer not found")
    }

    const result = await prisma.bike.create({
        data: bike,
    })
    return result
}

const getAllBikes = async () => {
    const result = await prisma.bike.findMany()
    return result
}

const getBikeById = async (bikeId: string) => {
    const result = await prisma.bike.findUnique({
        where: {
            bikeId,
        },
    })
    return result
}

const updateBike = async (bikeId: string, bike: Bike) => {
    const result = await prisma.bike.update({
        where: {
            bikeId,
        },
        data: bike,
    })
    return result
}



const getBikesByCustomerId = async (customerId: string) => {
    const result = await prisma.bike.findMany({
        where: { customerId },
    })
    return result
}


export const bikeService = {
    createBike,
    getAllBikes,
    getBikeById,
    updateBike,
    getBikesByCustomerId,
}