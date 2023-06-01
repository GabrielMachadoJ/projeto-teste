import { Request, Response } from "express";
import { TaskRepositoryImp } from "../repositories/implementations/taskRepositoryImp";
import { CreateTask } from "../use-cases/create-task";
import { GetOpenTasks } from "../use-cases/get-open-tasks";
import { GetTaskById } from "../use-cases/get-task-by-id";
import { ConcludeTask } from "../use-cases/conclude-task";
import { TakeTask } from "../use-cases/take-task";

export default class TaskController {
  public async create(req: Request, res: Response) {
    const { description, priority, starts_date, status, title, type, id_user } =
      req.body;

    try {
      const taskRepository = new TaskRepositoryImp();
      const createTask = new CreateTask(taskRepository);

      const task = await createTask.execute({
        description,
        id_user,
        priority,
        starts_date: starts_date,
        status,
        title,
        type,
      });
      res.status(201).send(task);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  public async get(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    try {
      const taskRepository = new TaskRepositoryImp();
      const getTask = new GetOpenTasks(taskRepository);

      const result = await getTask.get(page, limit);
      res.status(200).send(result);
    } catch (error) {
      throw new Error("Erro ao buscar registros");
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskRepository = new TaskRepositoryImp();
      const getTask = new GetTaskById(taskRepository);

      const result = await getTask.get(id ? parseInt(id) : 0);
      res.status(200).send(result);
    } catch (error) {
      throw new Error("Erro ao buscar registro");
    }
  }

  public async conclude(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskRepository = new TaskRepositoryImp();
      const concludeTask = new ConcludeTask(taskRepository);

      await concludeTask.conclude(id ? parseInt(id) : 0);
      res.status(200);
    } catch (error) {
      throw new Error("Erro ao concluir tarefa");
    }
  }

  public async take(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { idUser } = req.body;
      const taskRepository = new TaskRepositoryImp();
      const takeTask = new TakeTask(taskRepository);
      await takeTask.take(id ? parseInt(id) : 0, idUser ? parseInt(idUser) : 0);
      res.status(200);
    } catch (error) {
      throw new Error("Erro ao assumir tarefa");
    }
  }
}
