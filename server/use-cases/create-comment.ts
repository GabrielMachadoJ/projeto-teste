import { Comment, CommentsProps } from "../entities/comment";
import { CommentRepository } from "../repositories/interfaces/commentRepository";

interface CreateCommentRequest {
  id_user: number;
  starts_date: Date;
  description: string;
  id_task: number;
}

type CreateCommentResponse = CommentsProps;

export class CreateComment {
  constructor(private CommentRepository: CommentRepository) {}

  async execute({
    id_user,
    starts_date,
    description,
    id_task,
  }: CreateCommentRequest): Promise<CreateCommentResponse> {
    const comment = new Comment({
      id_user,
      starts_date,
      description,
      id_task,
    });

    return this.CommentRepository.create(comment);
  }
}
