import { useEffect, useState } from "react";
import MainContent from "../../components/MainContent";
import { useParams } from "react-router-dom";
import { TaskProps, TaskService } from "../../service/task/service";
import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { getDecrypted } from "../../utils/crypto";
import { CommentService } from "../../service/comment/service";

export interface UserProps {
  id: number;
  name: string;
  login: string;
  password: string;
}

export function DetailsTaskPage() {
  const [task, setTask] = useState<TaskProps>();
  const [user, setUser] = useState<UserProps>();
  const [obs, setObs] = useState<string>("");
  const [comments, setComments] = useState<any>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const { id } = useParams();

  async function getTask() {
    const res = await TaskService.getById(id ? parseInt(id) : 0);

    setTask(res.data);
  }

  async function getUser() {
    const { user } = getDecrypted(localStorage.getItem("user"));
    setUser(user);
  }

  const handleConcludeTask = async () => {
    await TaskService.conclude(id ? parseInt(id) : 0);
  };

  const handleTakeTask = async () => {
    await TaskService.take(id ? parseInt(id) : 0, user?.id ? user?.id : 0);
  };

  const handleNewComment = async () => {
    if (user && task) {
      const comment = {
        id_user: user.id,
        id_task: task.id ? task.id : 0,
        starts_date: new Date(),
        description: obs,
      };
      await CommentService.create(comment);
    }
  };

  const handleEditComment = async () => {
    const { description } = comments[0];
    setObs(description);
    setEditing(true);
  };

  const handleUpdadeComment = async () => {
    const { id } = comments[0];
    await CommentService.update(id ? parseInt(id) : 0, obs);
    setEditing(false);
  };

  async function getComments() {
    const res = await CommentService.getByTask(id ? parseInt(id) : 0);
    setComments(res.data);
  }

  useEffect(() => {
    getTask();
    getUser();
    getComments();
  }, []);

  return (
    <MainContent title={`Detalhes da Tarefa ${("0000" + id).slice(-4)}`}>
      <Flex direction="column">
        <Text style={{ fontWeight: "bold" }} fontSize="2xl">
          {task?.title}
        </Text>
        <Text style={{ fontWeight: "400", color: "" }} fontSize="xl">
          <Flex gap="2">
            Responsável: <Text style={{ fontWeight: "100" }}>{user?.name}</Text>
          </Flex>
        </Text>
      </Flex>
      <Button
        hidden={task?.id_user === user?.id}
        mt=".5rem"
        colorScheme="messenger"
        size="sm"
        onClick={handleTakeTask}
      >
        Assumir Tarefa
      </Button>
      <Flex mt="2rem" w="100%" h="30%">
        <Textarea
          h="100%"
          w="80%"
          mr="2rem"
          size="sm"
          resize="none"
          isReadOnly
          value={task?.description}
        />
        <Flex direction="column">
          <Text style={{ fontWeight: "normal" }} fontSize="2xl">
            <Flex gap="2">
              Prioridade:{" "}
              <Text style={{ fontWeight: "lighter" }}>{task?.priority}</Text>
            </Flex>
          </Text>
          <Text style={{ fontWeight: "normal" }} fontSize="2xl">
            <Flex gap="2">
              Tipo: <Text style={{ fontWeight: "lighter" }}>{task?.type}</Text>
            </Flex>
          </Text>
          <Text style={{ fontWeight: "normal" }} fontSize="2xl">
            <Flex gap="2">
              Criação:{" "}
              <Text style={{ fontWeight: "lighter" }}>
                {task?.starts_date &&
                  format(new Date(task.starts_date), "dd/MM/yyyy")}
              </Text>
            </Flex>
          </Text>
          <Text style={{ fontWeight: "normal" }} fontSize="2xl">
            <Flex gap="2">
              Situação:{" "}
              <Text style={{ fontWeight: "lighter" }}>{task?.status}</Text>
            </Flex>
          </Text>
          <Button
            isActive={task?.status !== "Aberto"}
            style={{ cursor: `${task?.status !== "Aberto" ? "default" : ""}` }}
            mt="1rem"
            size="sm"
            colorScheme="messenger"
            onClick={handleConcludeTask}
          >
            Finalizar Tarefa
          </Button>
        </Flex>
      </Flex>
      <FormLabel>Nova Observação</FormLabel>
      <Flex mb="2" w="100%" h="25%">
        <Textarea
          h="100%"
          w="40%"
          mr="2rem"
          placeholder="Digitar descrição"
          size="sm"
          resize="none"
          isDisabled={task?.id_user == user?.id && task?.status == "Aberto"}
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
        <Flex direction="column">
          <Text style={{ fontWeight: "bold" }} fontSize="2xl">
            Observações
          </Text>
          {comments.map((comment: any, index: number) => (
            <Flex direction="column" mb="2">
              <Text>{`Usuário ${comment.id_user} em `}</Text>
              <Text>{`${comment.description}`}</Text>
              {index === 0 &&
                user?.id === task?.id_user &&
                task?.status !== "Aberto" && (
                  <Text
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={handleEditComment}
                  >{`Editar`}</Text>
                )}
              <Divider />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Button
        isDisabled={task?.id_user == user?.id && task?.status == "Aberto"}
        onClick={editing ? handleUpdadeComment : handleNewComment}
      >
        Salvar
      </Button>
    </MainContent>
  );
}
