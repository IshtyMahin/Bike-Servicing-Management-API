import catchAsync from "../../../shared/catchAsync";
import { bikeService } from "./service";

const createBike = catchAsync(async (req, res) => {
    const bike = req.body;
    const result = await bikeService.createBike(req.body);
    res.status(201).json({
        success: true,
        message: "Bike added successfully",
        data: result,
    });
})

const getAllBikes = catchAsync(async (req, res) => {
    const result = await bikeService.getAllBikes();
    res.status(200).json({
        success: true,
        message: "Bikes fetched successfully",
        data: result,
    });
})

const getBikeById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await bikeService.getBikeById(id);
    res.status(200).json({
        success: true,
        message: "Bike fetched successfully",
        data: result,
    });
})

const updateBike = catchAsync(async (req, res) => {
    const { id } = req.params;
    const bike = req.body;
    const result = await bikeService.updateBike(id, bike);
    res.status(200).json({
        success: true,
        message: "Bike updated successfully",
        data: result,
    });
})

const getBikesByCustomerId = catchAsync(async (req, res) => {
    const { customerId } = req.params;
    const result = await bikeService.getBikesByCustomerId(customerId);
    res.status(200).json({
        success: true,
        message: "Bikes fetched successfully",
        data: result,
    });
})

// const deleteBike = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await bikeService.deleteBike(id);
//     res.status(200).json({
//         success: true,
//         message: "Bike deleted successfully",
//     });
// })

export const bikeController = {
    createBike,
    getAllBikes,
    getBikeById,
    updateBike,
    getBikesByCustomerId,
    // deleteBike,
}
