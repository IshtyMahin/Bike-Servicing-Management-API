import catchAsync from "../../../shared/catchAsync";
import { customerService } from "./service";

const createCustomer = catchAsync(async (req, res) => {
    const customer = req.body;
    const result = await customerService.createCustomer(req.body);
    res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: result,
    });
})

const getAllCustomers = catchAsync(async (req, res) => {
    const result = await customerService.getAllCustomers();
    res.status(200).json({
        success: true,
        message: "Customers fetched successfully",
        data: result,
    });
})

const getCustomerById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await customerService.getCustomerById(id);
    res.status(200).json({
        success: true,
        message: "Customer fetched successfully",
        data: result,
    });
})

const updateCustomer = catchAsync(async (req, res) => {
    const { id } = req.params;
    const customer = req.body;
    const result = await customerService.updateCustomer(id, customer);
    res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: result,
    });
})

const deleteCustomer = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);
    res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
    });
})

export const customerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
}

