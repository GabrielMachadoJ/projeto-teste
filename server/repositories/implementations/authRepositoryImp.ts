import { UserProps } from "../../entities/user";
import { AuthRepository } from "../interfaces/authRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepositoryImp implements AuthRepository {
  async authenticate(
    login: string,
    password: string
  ): Promise<UserProps | null> {
    try {
      const res = await prisma.users.findFirst({
        where: {
          login,
          password,
        },
      });

      return res;
    } catch (error) {
      throw new Error("Usuario não encontrado");
    }
  }
}
