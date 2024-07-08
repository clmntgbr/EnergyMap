import { DateTime } from "luxon";

export interface IType {
  id: number;
  uuid: string;
  name: string;
  reference: string;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
