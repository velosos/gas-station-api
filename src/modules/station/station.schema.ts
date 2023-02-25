import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'


const stationInputService = z.object({
  title: z.string(),
  price: z.number(),
})

const stationInput = {
  name: z.string(),
  address: z.string(),
  lat: z.number().optional(),
  long: z.number().optional(),
  services: z.array(stationInputService)
}

const productGenerated = {
  id: z.number(),
  createAt: z.string(),
  updated: z.string(),
}

const createStationSchema = z.object({
  ...stationInput,
})
const stationResponseSchema = z.object({
  ...productGenerated,
  ...stationInput,

})

const stationsResponseSchema = z.array(stationResponseSchema)

export type CreateStationInput = z.infer<typeof createStationSchema>
export const { schemas: statiosSchemas, $ref } = buildJsonSchemas({
  createStationSchema,
  stationResponseSchema,
  stationsResponseSchema
}, { $id: 'station' })