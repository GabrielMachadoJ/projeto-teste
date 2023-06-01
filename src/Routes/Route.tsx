import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTask from "../pages/task/index.tsx";
import CreateTaskPage from "../pages/task/createTask.tsx";
import { DetailsTaskPage } from "../pages/task/detailsTaskPage.tsx";
import { LoginPage } from "../pages/login/index.tsx";
import { RequireAuth } from "../components/RequireAuth.tsx";
import { UnauthorizedUser } from "../pages/erros/Unauthorized.tsx";
import { PageNotFound } from "../pages/erros/PageNotFound.tsx";

const ROLES = {
  admin: 1,
};
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/task" element={<HomeTask />} />
          <Route path="/task/unauthorized" element={<UnauthorizedUser />} />
          <Route path="/task/create" element={<CreateTaskPage />} />
          <Route path="/task/details/:id" element={<DetailsTaskPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
