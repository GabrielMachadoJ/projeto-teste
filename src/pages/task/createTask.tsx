import { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  StackDivider,
  Text,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import MainContent from "../../components/MainContent";
import { useNavigate } from "react-router-dom";
import { AlertContextContext } from "../../context/AlertContext";
import { TaskService } from "../../service/task/service";
import { getDecrypted } from "../../utils/crypto";
import { UserProps } from "./detailsTaskPage";

export default function CreateTaskPage() {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>();
  const toast = useToast();
  const { setMessage, message } = useContext(AlertContextContext);

  const navigate = useNavigate();

  const clearStates = () => {
    setTitle("");
    setType("");
    setPriority("");
    setDescription("");
  };

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { user } = getDecrypted(localStorage.getItem("user"));
    setUser(user);
  }
  const handleSaveTask = async () => {
    setIsLoading(true);
    const task = {
      title: title,
      description: description,
      id_user: user?.id ? user.id : 0,
      type: type,
      priority: priority,
      status: "Aberto",
      starts_date: new Date(),
    };
    const result = await TaskService.create(task);
    const taskId = result.data.id;
    toast({
      position: "top",
      title: "Sucesso",
      description: `Tarefa ${message} inserida com sucesso.`,
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    clearStates();
    setMessage(taskId);
    navigate("/task");
    setIsLoading(false);
  };

  return (
    <MainContent title="Inserir Tarefa">
      <Stack>
        <Flex justify="space-between">
          <FormControl w="45rem" mr="2rem" isRequired={!title}>
            <FormLabel>Título</FormLabel>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Título"
              value={title}
            />
          </FormControl>
          <Flex>
            <FormControl isRequired={!type} w="15rem" mr="2rem">
              <FormLabel>Tipo</FormLabel>
              <Select
                onChange={(e) => setType(e.target.value)}
                placeholder="Selecione um tipo"
                value={type}
              >
                <option value="Incidente">Incidente</option>
                <option value="Solicitação">Solicitação de Serviço</option>
                <option value="Melhorias">Melhorias</option>
                <option value="Projetos">Projetos</option>
              </Select>
            </FormControl>
            <FormControl isRequired={!priority} w="15rem">
              <FormLabel>Prioridade</FormLabel>
              <Select
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Selecione uma prioridade"
                value={priority}
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
                <option value="Sem prioridade">Sem prioridade</option>
              </Select>
            </FormControl>
          </Flex>
        </Flex>
        <FormControl h="30rem" isRequired={!description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            h="100%"
            placeholder="Digitar descrição"
            size="sm"
            resize="none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Flex w="100%">
          <Button
            variant="outline"
            isLoading={isLoading}
            colorScheme="green"
            size="lg"
            mr="2rem"
            w="8rem"
            mt="3rem"
            onClick={handleSaveTask}
          >
            Salvar
          </Button>
          <Button
            mt="3rem"
            w="8rem"
            variant="outline"
            colorScheme="red"
            size="lg"
            onClick={() => navigate("/task")}
          >
            Cancelar
          </Button>
        </Flex>
      </Stack>
    </MainContent>
  );
}
