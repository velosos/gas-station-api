import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStationInput } from "./station.schema";
import { createStation, getStations } from "./station.service";

export async function createStationHandler(
  request: FastifyRequest<{
    Body: CreateStationInput;
  }>
) {
  const station = await createStation({
    ...request.body,
    userId: request.id
  });

  return station;
}

export async function getStationsHandler() {
  const products = await getStations();

  return products;
}
