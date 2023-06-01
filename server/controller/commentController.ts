import { Request, Response } from "express";
import { CommentRepositoryImp } from "../repositories/implementations/commentRepositoryImp";
import { CreateComment } from "../use-cases/create-comment";
import { GetCommentById } from "../use-cases/get-comment-by-id";
import { GetCommentByTaskId } from "../use-cases/get-comment-by-task";
import { UpdateComment } from "../use-cases/update-comment";

export default class CommentController {
  public async create(req: Request, res: Response) {
    const { description, starts_date, id_user, id_task } = req.body;

    try {
      const commentRepository = new CommentRepositoryImp();
      const createComment = new CreateComment(commentRepository);

      const comment = await createComment.execute({
        description,
        id_user,
        starts_date,
        id_task,
      });
      res.status(201).send(comment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const commentRepository = new CommentRepositoryImp();
      const getComment = new GetCommentById(commentRepository);

      const result = await getComment.get(id ? parseInt(id) : 0);
      res.status(200).send(result);
    } catch (error) {
      throw new Error("Erro ao buscar registros");
    }
  }

  public async getByTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const commentRepository = new CommentRepositoryImp();
      const getComment = new GetCommentByTaskId(commentRepository);
      const result = await getComment.get(taskId ? parseInt(taskId) : 0);
      res.status(200).send(result);
    } catch (error) {
      throw new Error("Erro ao buscar registros");
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const commentRepository = new CommentRepositoryImp();
      const updateComment = new UpdateComment(commentRepository);
      await updateComment.update(id ? parseInt(id) : 0, description);

      res.status(200);
    } catch (error) {
      throw new Error("Erro ao atualizar o registros");
    }
  }
}
