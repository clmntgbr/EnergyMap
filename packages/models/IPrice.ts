import { DateTime } from "luxon";
import { IStation } from "./IStation";
import { IType } from "./IType";

export interface IPrice {
  id: number;
  uuid: string;
  stationRelated: string;
  value: string;
  datetimestamp: string;
  stationId: number | null;
  station: IStation | null;
  typeId: number;
  type: IType;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
