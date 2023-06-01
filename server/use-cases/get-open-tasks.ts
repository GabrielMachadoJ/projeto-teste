import { Task } from "../entities/task";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

interface OpenTasks {
  description: string;
  priority: string;
  starts_date: Date;
  status: string;
  title: string;
  id_user: number;
  type: string;
}

type CreateTaskResponse = Task;

export class GetOpenTasks {
  constructor(private taskRepository: TaskRepository) {}

  async get(page: number, limit: number): Promise<any> {
    const openTasks = await this.taskRepository.getOpenTasks(page, limit);
    return openTasks;
  }
}
