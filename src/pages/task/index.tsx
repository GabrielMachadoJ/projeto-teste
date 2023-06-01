import { useContext, useEffect, useState } from "react";
import { Box, Button, Icon, Td, Tr, useColorMode } from "@chakra-ui/react";
import MainContent from "../../components/MainContent";
import { useNavigate } from "react-router-dom";
import { AlertContextContext } from "../../context/AlertContext";
import { DataTable } from "../../components/DataTable";
import { Pagination } from "../../components/Pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TaskProps, TaskService } from "../../service/task/service";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function HomeTask() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(10);
  const [pages, setPages] = useState<number[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  async function getTasks() {
    const result = await TaskService.get(currentPage, limitRegistros);
    setTasks(result.data.tasks);
    setTotalTasks(result.data.total);
  }

  useEffect(() => {
    getTasks();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalTasks, limitRegistros]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalTasks / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const headers: { key: string; label: string }[] = [
    { key: "id", label: "N° Tarefa" },
    { key: "title", label: "Título" },
    { key: "type", label: "Tipo" },
    { key: "prioraty", label: "Prioridade" },
    { key: "openDate", label: "Data de Abertura" },
    { key: "user", label: "Responsável" },
  ];

  return (
    <MainContent title="Tarefas">
      <Button onClick={() => navigate("/task/create")}>Criar tarefa</Button>
      <DataTable headers={headers}>
        {tasks.map((task) => (
          <Tr key={task.id}>
            <Td>
              <Link
                style={{ textDecoration: "none" }}
                key={task.id}
                to={`/task/details/${task.id}`}
              >
                <Box
                  style={{
                    color: `${colorMode === "light" ? "#6495ED" : "#87CEFA"}`,
                  }}
                  _hover={{ textDecoration: "underline" }}
                >
                  {("0000" + task.id).slice(-4)}
                </Box>
              </Link>
            </Td>
            <Td>{task.title}</Td>
            <Td>{task.type}</Td>
            <Td>{task.priority}</Td>
            <Td>{format(new Date(task.starts_date), "dd/MM/yyyy")}</Td>
            <Td>Usuário {task.id_user}</Td>
          </Tr>
        ))}
      </DataTable>
      <Pagination
        currentPage={currentPage}
        limitRegistros={limitRegistros}
        totalTasks={totalTasks}
        changeLimitRegister={setLimitRegistros}
      >
        <Button
          isDisabled={currentPage === 1}
          variant="ghost"
          size="sm"
          fontSize="2xl"
          width="4"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <Icon as={FiChevronLeft} />
        </Button>
        <Button
          isDisabled={
            currentPage === pages.length ||
            tasks.length === 0 ||
            limitRegistros >= totalTasks
          }
          variant="ghost"
          size="sm"
          fontSize="2xl"
          width="4"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <Icon as={FiChevronRight} />
        </Button>
      </Pagination>
    </MainContent>
  );
}
