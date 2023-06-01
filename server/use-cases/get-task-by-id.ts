import { TaskDB } from "../repositories/implementations/taskRepositoryImp";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

type TaskResponse = TaskDB | null;

export class GetTaskById {
  constructor(private taskRepository: TaskRepository) {}

  async get(id: number): Promise<TaskResponse> {
    const task = await this.taskRepository.getByid(id);
    return task;
  }
}
