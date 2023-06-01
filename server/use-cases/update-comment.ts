import { TaskDB } from "../repositories/implementations/taskRepositoryImp";
import { CommentRepository } from "../repositories/interfaces/commentRepository";
import { TaskRepository } from "../repositories/interfaces/taskRepository";

type TaskResponse = void;

export class UpdateComment {
  constructor(private commentRepository: CommentRepository) {}

  async update(id: number, description: string): Promise<TaskResponse> {
    await this.commentRepository.update(id, description);
  }
}
