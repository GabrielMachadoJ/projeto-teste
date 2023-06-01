import { AxiosResponse } from "axios";
import { Api } from "../ApiConfig";

export interface CommentsProps {
  id?: number;
  id_user: number;
  id_task: number;
  starts_date: Date;
  description: string;
}

const create = async (
  props: CommentsProps
): Promise<AxiosResponse<any, any>> => {
  const result = await Api().post("/comment", props);

  return result;
};

const getById = async (id: number): Promise<AxiosResponse<any, any>> => {
  const result = await Api().get(`/comment/${id}`);

  return result;
};

const getByTask = async (idTask: number): Promise<AxiosResponse<any, any>> => {
  const result = await Api().get(`/comment/task/${idTask}`);
  return result;
};

const update = async (id: number, description: string): Promise<void> => {
  await Api().post(`/comment/${id}`, { description });
};

export const CommentService = {
  create,
  getById,
  getByTask,
  update,
};
