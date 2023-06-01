import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getDecrypted } from "../utils/crypto";
import { UnauthorizedUser } from "../pages/erros/Unauthorized.tsx";

interface IAuthProps {
  allowedRoles: number[];
}

export function RequireAuth({ allowedRoles }: IAuthProps) {
  const location = useLocation();

  const LOCAL_DATA = getDecrypted(localStorage.getItem("user"));

  const PERMISSION = LOCAL_DATA?.permissao ? LOCAL_DATA.permissao : 0;

  return allowedRoles.some((el) => [PERMISSION].includes(el)) ? (
    <Outlet />
  ) : parseInt(PERMISSION) === 0 ? (
    <UnauthorizedUser />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
