import { CommentsProps } from "../entities/comment";
import { CommentRepository } from "../repositories/interfaces/commentRepository";

type CommentResponse = CommentsProps | null;

export class GetCommentById {
  constructor(private commentRepository: CommentRepository) {}

  async get(id: number): Promise<CommentResponse> {
    const comment = await this.commentRepository.getByid(id);
    return comment;
  }
}
