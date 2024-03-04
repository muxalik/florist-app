import { z } from 'zod'

export const createManufacturerSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно быть не более 50 символов',
    })
    .max(50),
})

export type CreateManufacturerSchema = z.infer<typeof createManufacturerSchema>

export const editManufacturerSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно быть не более 50 символов',
    })
    .max(50),
})

export type EditManufacturerSchema = z.infer<typeof editManufacturerSchema>

export const viewManufacturerSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно быть не более 50 символов',
    })
    .max(50),
  colorId: z.number().nullable(),
  productsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type ViewManufacturerSchema = z.infer<typeof viewManufacturerSchema>
