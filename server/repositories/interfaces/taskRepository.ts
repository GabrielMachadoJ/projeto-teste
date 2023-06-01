import { Task, TaskProps } from "../../entities/task";
import { PaginatedTasks, TaskDB } from "../implementations/taskRepositoryImp";

export interface TaskRepository {
  create(task: Task): Promise<TaskDB>;
  getOpenTasks(page: number, pageSize: number): Promise<PaginatedTasks | null>;
  getByid(id: number): Promise<TaskDB | null>;
  concludeTask(id: number): Promise<void>;
  takeTask(id: number, idUser: number): Promise<void>;
}
