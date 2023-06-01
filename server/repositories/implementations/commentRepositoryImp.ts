import { Comment, CommentsProps } from "../../entities/comment";
import { CommentRepository } from "../interfaces/commentRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CommentRepositoryImp implements CommentRepository {
  async update(id: number, description: string): Promise<void> {
    try {
      const result = await prisma.comments.update({
        where: { id: id },
        data: {
          description: description,
          starts_date: new Date(),
        },
      });
    } catch (error) {
      throw new Error("Erro ao concluir tarefa");
    }
  }
  async create(comment: Comment): Promise<CommentsProps> {
    try {
      const res = await prisma.comments.create({
        data: {
          description: comment.description,
          starts_date: comment.startDate,
          id_user: comment.userId,
          id_task: comment.taskId,
        },
      });
      return res;
    } catch (error) {
      throw Error(`Erro ao criar observação`);
    }
  }

  async getByTaskId(id: number): Promise<CommentsProps[] | null> {
    try {
      const res = await prisma.comments.findMany({
        where: {
          id_task: id,
        },
        orderBy: { starts_date: "desc" },
      });
      return res;
    } catch (error) {
      throw new Error("Erro ao buscar observação");
    }
  }

  async getByid(id: number): Promise<CommentsProps | null> {
    try {
      const res = await prisma.comments.findUnique({
        where: {
          id: id,
        },
      });
      return res;
    } catch (error) {
      throw new Error("Erro ao buscar observação");
    }
  }
}
