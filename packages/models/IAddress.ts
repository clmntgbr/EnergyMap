import { DateTime } from "luxon";

export interface IAddress {
  id: number;
  uuid: string;
  stationId: string;
  vicinity: string;
  street: string;
  number: string | null;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  longitude: number;
  latitude: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
