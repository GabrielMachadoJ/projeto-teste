import { Request, Response } from "express";
import { AuthRepositoryImp } from "../repositories/implementations/authRepositoryImp";
import { AuthUser } from "../use-cases/auth-user";

export default class LoginController {
  public async auth(req: Request, res: Response) {
    const { login, password } = req.body;
    try {
      const authRepository = new AuthRepositoryImp();
      const authUser = new AuthUser(authRepository);

      const user = await authUser.authenticate({ login, password });

      res.status(200).send(user);
    } catch (e: any) {
      return res.status(400).send("Credenciais inválidas");
    }
  }
}
