import { AxiosResponse } from "axios";
import { Api } from "../ApiConfig";

export interface TaskProps {
  id?: number;
  title: string;
  description: string;
  id_user: number;
  type: string;
  priority: string;
  status: string;
  starts_date: Date;
}

const create = async (props: TaskProps): Promise<AxiosResponse<any, any>> => {
  const result = await Api().post("/task", props);

  return result;
};

const get = async (
  page: number,
  limit: number
): Promise<AxiosResponse<any, any>> => {
  const result = await Api().get(`/task?page=${page}&limit=${limit}`);

  return result;
};

const getById = async (id: number): Promise<AxiosResponse<any, any>> => {
  const result = await Api().get(`/task/${id}`);

  return result;
};

export const TaskService = {
  create,
  get,
  getById,
};
