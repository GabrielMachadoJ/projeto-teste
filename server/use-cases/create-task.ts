import { Task } from "../entities/task";
import { TaskDB } from "../repositories/implementations/taskRepositoryImp";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

interface CreateTaskRequest {
  description: string;
  priority: string;
  starts_date: Date;
  status: string;
  title: string;
  id_user: number;
  type: string;
}

type CreateTaskResponse = TaskDB;

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    description,
    id_user,
    priority,
    starts_date,
    status,
    title,
    type,
  }: CreateTaskRequest): Promise<CreateTaskResponse> {
    const task = new Task({
      description,
      id_user,
      priority,
      starts_date,
      status,
      title,
      type,
    });

    return this.taskRepository.create(task);
  }
}
