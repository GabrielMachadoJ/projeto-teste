import { Comment, CommentsProps } from "../../entities/comment";

export interface CommentRepository {
  create(comment: Comment): Promise<CommentsProps>;
  getByTaskId(id: number): Promise<CommentsProps[] | null>;
  getByid(id: number): Promise<CommentsProps | null>;
  update(id: number, description: string): Promise<void>;
}
