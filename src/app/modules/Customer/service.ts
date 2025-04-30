
import { Customer } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createCustomer = async (customer: Customer) => {
    const result = await prisma.customer.create({
        data: customer,
    })
    return result
}

const getAllCustomers = async () => {
    const result = await prisma.customer.findMany()
    return result
}

const getCustomerById = async (id: string) => {
    const result = await prisma.customer.findUnique({
        where: {
            customerId : id,
        },
    })
    return result
}
const updateCustomer = async (id: string, customer: Customer) => {
    const result = await prisma.customer.update({
        where: {
            customerId: id,
        },
        data: customer,
    })
    return result
}
const deleteCustomer = async (customerId: string) => {
    const result = await prisma.$transaction(async (tx:any) => {
       
        const customerBikes = await tx.bike.findMany({
            where: { customerId },
            select: { bikeId: true }
        });
        
        const bikeIds = customerBikes.map((bike: { bikeId: string }) => bike.bikeId);
        
        await tx.serviceRecord.deleteMany({
            where: { bikeId: { in: bikeIds } },
        });

        await tx.bike.deleteMany({
            where: { customerId },
        });

        const deletedCustomer = await tx.customer.delete({
            where: { customerId },  
        });

        return deletedCustomer;
    });
    return result;
}

export const customerService = {
    createCustomer, 
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
}