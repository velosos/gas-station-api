import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail } from "./user.service";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput
  }>,
  response: FastifyReply
) {
  const body = request.body

  try {
    const user = await createUser(body)
    return response.code(201).send(user)
  } catch (error) {
    console.error(error)
    return response.code(500).send(error)
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  response: FastifyReply
) {
  const body = request.body

  const user = await findUserByEmail(body.email)
  if (!user) {
    return response.code(401).send({
      message: 'Invalid Email'
    });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  })

  if (correctPassword) {
    const { password, salt, ...rest } = user
    return { accessToken: server.jwt.sign(rest) };
  }

  return response.code(401).send({
    message: 'Invalid email or password'
  })

}

// export async function getUserHandler(){
//   const users = await findUsers()

//   return
// }