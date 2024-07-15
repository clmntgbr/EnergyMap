import { DateTime } from "luxon";

export interface IAddress {
  id: number;
  uuid: string;
  stationId: string;
  vicinity: string;
  street: string | null;
  number: string | null;
  city: string | null;
  region: string;
  postalCode: string | null;
  country: string;
  longitude: number;
  latitude: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
