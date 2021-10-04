import { User } from "./user.model";

export interface Community {
  id?: string;
  creationDate?: Date;
  description?: string;
  title?: string;
  avatar?: string;
  creator?: User;
}
