import { z } from 'zod'

export const createTagSchema = z.object({
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
})

export type CreateTagSchema = z.infer<typeof createTagSchema>

export const editTagSchema = z.object({
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
})

export type EditTagSchema = z.infer<typeof editTagSchema>

export const viewTagSchema = z.object({
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

export type ViewTagSchema = z.infer<typeof viewTagSchema>
