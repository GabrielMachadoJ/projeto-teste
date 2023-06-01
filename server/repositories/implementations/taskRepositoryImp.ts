import { Task, TaskProps } from "../../entities/task";
import { TaskRepository } from "../interfaces/taskRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface TaskDB {
  id: number;
  title: string;
  description: string;
  id_user: number;
  type: string;
  priority: string;
  status: string;
  starts_date: Date;
}

export interface PaginatedTasks {
  tasks: TaskDB[];
  total: number;
}
export class TaskRepositoryImp implements TaskRepository {
  async create(task: Task): Promise<TaskDB> {
    try {
      const res = await prisma.tasks.create({
        data: {
          description: task.description,
          priority: task.priority,
          starts_date: task.starts_date,
          status: task.status,
          title: task.title,
          id_user: task.id_user,
          type: task.type,
        },
      });
      return res;
    } catch (error) {
      throw Error(`Erro ao criar tarefa`);
    }
  }

  async getOpenTasks(page: number, pageSize: number): Promise<PaginatedTasks> {
    try {
      const [tasks, total] = await Promise.all([
        prisma.tasks.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: { status: "Aberto" },
          orderBy: {
            id: "asc",
          },
        }),
        prisma.tasks.count(),
      ]);

      return {
        tasks,
        total,
      };
    } catch (error) {
      throw Error(`Erro ao buscar tarefas`);
    }
  }

  async getByid(id: number): Promise<TaskDB | null> {
    try {
      const res = await prisma.tasks.findUnique({
        where: {
          id: id,
        },
      });
      return res;
    } catch (error) {
      throw new Error("Erro ao buscar tarefa");
    }
  }

  async concludeTask(id: number): Promise<void> {
    try {
      await prisma.tasks.update({
        where: { id: id },
        data: {
          status: "Concluido",
        },
      });
    } catch (error) {
      throw new Error("Erro ao concluir tarefa");
    }
  }

  async takeTask(id: number, idUser: number): Promise<void> {
    try {
      await prisma.tasks.update({
        where: { id: id },
        data: {
          id_user: idUser,
        },
      });
    } catch (error) {
      throw new Error("Erro ao assumir tarefa");
    }
  }
}
