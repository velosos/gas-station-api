import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const userBase = {
  email: z.string({
    required_error: "Email is mandatory",
    invalid_type_error: "Email must be a string"
  }).email(),
  name: z.string({
    required_error: "Name is mandatory",
  }),
}

const createUserSchema = z.object({
  ...userBase,
  password: z.string(
    {
      required_error: "Password is mandatory",
      invalid_type_error: "Password must be a string"
    }
  )
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userBase
});

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is mandatory",
    invalid_type_error: "Email must be a string"
  }).email(),
  password: z.string()
})

const loginResponseSchema = z.object({
  accessToken: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>


export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
})