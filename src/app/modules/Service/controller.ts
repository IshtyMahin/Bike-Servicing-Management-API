import catchAsync from "../../../shared/catchAsync";
import { serviceFile } from "./service";


const createService = catchAsync(async (req, res) => {

    const result = await serviceFile.createService(req.body);
    res.status(201).json({
        success: true,
        message: "Service record created successfully",
        data: result,
    });
})

const getAllServices = catchAsync(async (req, res) => {
    const result = await serviceFile.getAllServices();
    res.status(200).json({
        success: true,
        message: "Service records fetched successfully",
        data: result,
    });
})

const getServiceById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await serviceFile.getServiceById(id);
    res.status(200).json({
        success: true,
        message: "Service record fetched successfully",
        data: result,
    });
})

const updateService = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await serviceFile.updateServiceCompleteStatus(id, req.body.completionDate);
    res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: result,
    });
})

const getPendingOrOverdueServices = catchAsync(async (req, res) => {
    console.log("getPendingOrOverdueServices");
    
    const result = await serviceFile.getPendingOrOverdueServices();
    res.status(200).json({
        success: true,
        message: "Overdue or pending services fetched successfully",
        data: result,
    });
})

export const serviceController = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    getPendingOrOverdueServices
}