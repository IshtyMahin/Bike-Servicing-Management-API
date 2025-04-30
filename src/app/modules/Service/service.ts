
import { Prisma, ServiceRecord, serviceStatus } from "@prisma/client"
import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError"


const createService = async (service: ServiceRecord) => {
    console.log(service);
    
    const bikeData = await prisma.bike.findUnique({
        where: {
            bikeId: service.bikeId
        }
    })

    if (!bikeData) {
        throw new ApiError(404,"Bike not found")
    }
    const result = await prisma.serviceRecord.create({
        data: service,
    })
    return result
}

const getAllServices = async () => {
    const result = await prisma.serviceRecord.findMany()
    return result
}

const getServiceById = async (serviceId: string) => {
    const result = await prisma.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId
        },
    })
    return result
}


const updateServiceCompleteStatus = async (
  serviceId: string,
  completionDate?: Date
) => {
  
  try {
    const result = await prisma.serviceRecord.update({
      where: { 
        serviceId

       },
      data: {
        completionDate: completionDate || new Date(),
        status:serviceStatus.done
      },
      include: {
        bike: true 
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new ApiError(404, "Service record not found");
      }
    }
    throw error;
  }
};
const getPendingOrOverdueServices = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    console.log(sevenDaysAgo);
    
    const result = await prisma.serviceRecord.findMany({
        where: {
            OR: [
                { status: serviceStatus.pending },
                { status: serviceStatus.in_progress }
            ],
            AND: [
                { completionDate: null },
                { serviceDate: { lt: sevenDaysAgo } }
            ]
        },
        include: {
            bike: true
        }
    });
    return result;
};

export const serviceFile = {
    createService,
    getAllServices,
    getServiceById,
    updateServiceCompleteStatus,
    getPendingOrOverdueServices
}

