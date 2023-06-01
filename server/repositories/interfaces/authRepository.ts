import { UserProps } from "../../entities/user";
export interface AuthRepository {
  authenticate(login: string, password: string): Promise<UserProps | null>;
}
