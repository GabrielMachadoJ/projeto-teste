import { TaskDB } from "../repositories/implementations/taskRepositoryImp";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

type TaskResponse = void;

export class TakeTask {
  constructor(private taskRepository: TaskRepository) {}

  async take(id: number, idUser: number): Promise<TaskResponse> {
    await this.taskRepository.takeTask(id, idUser);
  }
}
