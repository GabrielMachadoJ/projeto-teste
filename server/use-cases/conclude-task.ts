import { TaskDB } from "../repositories/implementations/taskRepositoryImp";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

type TaskResponse = void;

export class ConcludeTask {
  constructor(private taskRepository: TaskRepository) {}

  async conclude(id: number): Promise<TaskResponse> {
    await this.taskRepository.concludeTask(id);
  }
}
