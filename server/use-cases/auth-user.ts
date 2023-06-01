import { AuthRepository } from "../repositories/interfaces/authRepository";

interface AuthRequest {
  login: string;
  password: string;
}

type AuthResponse = AuthUser;

export class AuthUser {
  constructor(private authRepository: AuthRepository) {}

  async authenticate({ login, password }: AuthRequest) {
    const user = await this.authRepository.authenticate(login, password);
    return user;
  }
}
