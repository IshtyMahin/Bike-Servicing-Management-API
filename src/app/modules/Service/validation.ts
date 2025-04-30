import z from 'zod'


const createServiceZodSchema = z.object({
    body:z.object({
        description: z.string({
            required_error: "Description is required"
        }),
        serviceDate: z.string({
            required_error: "Service date is required"
        }),
        bikeId: z.string({
            required_error: "Bike id is required"
        }), 
        status: z.string({
            required_error: "Status is required"
        }),
        completionDate: z.string({
            required_error: "Completion date is required"
        }).optional()
    })
})

export const updateServiceZodSchema = z.object({
    body: z.object({
      completionDate: z.coerce.date().optional(), 
      status: z.enum(["DONE"]).optional().default("DONE") 
    })
  });

export const ServiceValidation = {
    createServiceZodSchema,
    updateServiceZodSchema
}