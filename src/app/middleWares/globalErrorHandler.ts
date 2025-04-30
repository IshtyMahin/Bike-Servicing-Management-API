import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError";
import config from "../../config";
import { errorResponseSchema } from "../errors/zodError";
import { Prisma } from "@prisma/client";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const zodErrorResponse = {
      success: false,
      status: httpStatus.BAD_REQUEST,
      message: "Validation error",
      issues: err.errors.map(e => ({
        code: e.code,
        path: e.path,
        message: e.message
      })),
      ...(config.env === "development" && { stack: err.stack })
    };

    const validatedResponse = errorResponseSchema.parse(zodErrorResponse);
    return res.status(validatedResponse.status).json(validatedResponse);
  }

  // Handle ApiError instances
  if (err instanceof ApiError) {
    const apiErrorResponse = {
      success: false,
      status: err.statusCode,
      message: err.message,
      ...(config.env === "development" && { stack: err.stack })
    };

    const validatedResponse = errorResponseSchema.parse(apiErrorResponse);
    return res.status(validatedResponse.status).json(validatedResponse);
  }

  if (err instanceof Error && 'code' in err && 'meta' in err) {
    const prismaErrorResponse = {
      success: false,
      status: httpStatus.BAD_REQUEST,
      message: (err.meta as { cause?: string })?.cause || err.message,
      ...(config.env === "development" && { stack: err.stack })
    };

    const validatedResponse = errorResponseSchema.parse(prismaErrorResponse);
    return res.status(validatedResponse.status).json(validatedResponse);
  }

  const genericErrorResponse = {
    success: false,
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
    ...(config.env === "development" && { stack: (err as Error)?.stack })
  };

if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error - check your input data",
      ...(process.env.NODE_ENV === 'development' && {
        details: err.message.split('\n').slice(0, 5).join('\n')
      })
    })
  }

  const validatedResponse = errorResponseSchema.parse(genericErrorResponse);
  res.status(validatedResponse.status).json(validatedResponse);
};

export default globalErrorHandler;