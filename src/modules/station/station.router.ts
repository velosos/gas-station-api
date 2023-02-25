import { FastifyInstance } from 'fastify';
import { createStationHandler, getStationsHandler } from './station.controller';
import { $ref } from './station.schema';

async function stationRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createStationSchema"),
        response: {
          201: $ref("stationResponseSchema"),
        },
      },
    },
    createStationHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("stationsResponseSchema"),
        },
      },
    },

    getStationsHandler
  );
}

export default stationRoutes;