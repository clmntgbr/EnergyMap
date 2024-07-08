import { DateTime } from "luxon";
import { IAddress } from "./IAddress";
import { IPrice } from "./IPrice";

export interface IStation {
  id: number;
  uuid: string;
  stationId: string;
  type: string;
  pop: string;
  name: string | null;
  status: string;
  element: string;
  address: IAddress;
  addressId: number;
  prices: IPrice[];
  closedAt: DateTime | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
