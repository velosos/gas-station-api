import prisma from "../../utils/prisma";
import { CreateStationInput } from "./station.schema";

export async function createStation(data: CreateStationInput & { userId: number }) {
  return prisma.station.create({
    data,
  });
}

export function getStations() {
  return prisma.station.findMany({
    select: {
      id: true,
      name: true,
      updatedAt: true,
      UpdatedBy: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}