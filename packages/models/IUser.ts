import { DateTime } from "luxon";

export interface IUser {
  id: number;
  givenName: string | null;
  familyName: string | null;
  email: string;
  password: string;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}
