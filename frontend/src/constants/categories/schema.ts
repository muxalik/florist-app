import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно быть не более 50 символов',
    })
    .max(50),
  parentId: z.number().nullable(),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const editCategorySchema = z.object({
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
  parentId: z.number().nullable(),
})

export type EditCategorySchema = z.infer<typeof editCategorySchema>

export const viewCategorySchema = z.object({
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
  parentId: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type ViewCategorySchema = z.infer<typeof viewCategorySchema>
