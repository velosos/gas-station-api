import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt'
import userRoutes from './modules/user/user.router';
import { userSchemas } from './modules/user/user.schema'


export const server = Fastify()

server.register(jwt, {
  secret: 'wdofhsldkvjck89jjfofkfjsdf',
})

server.decorate(
  'authenticate',
  async (request: FastifyRequest, response: FastifyReply) => {
    try {
      await request.jwtVerify();

    } catch (error) {
      return response.send(error)
    }
  })

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema)
  }
  server.register(userRoutes, { prefix: 'api/user' })
  try {
    await server.listen(3000, '0.0.0.0')
    console.log(`Server at port 3000`)
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}

main()