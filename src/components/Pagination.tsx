import { ReactNode } from "react";
import { Flex, Select, Stack, Text } from "@chakra-ui/react";

interface IPagination {
  children: ReactNode;
  limitRegistros: number;
  currentPage: number;
  totalTasks: number;
  changeLimitRegister: (value: number) => void;
}

export function Pagination({
  children,
  limitRegistros,
  currentPage,
  totalTasks,
  changeLimitRegister,
}: IPagination) {
  return (
    <Stack
      direction="row"
      spacing="6"
      m={{ base: "2rem 0 .5rem 0", md: "2rem 0 .5rem 0", lg: "2rem 0" }}
      justify="flex-end"
      align="center"
      w="90%"
    >
      <Flex align="center" gap="3">
        <Text fontFamily="Poppins" fontSize="md">
          Registros por Página
        </Text>
        <Flex justify="center" align="center" gap="2">
          <Select
            onChange={(e) => changeLimitRegister(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="15">15</option>
          </Select>
          <Text>{limitRegistros * (currentPage - 1) + 1}</Text> -{" "}
          <Text>
            {limitRegistros * currentPage > totalTasks
              ? totalTasks
              : limitRegistros * currentPage}
          </Text>{" "}
          de <Text fontWeight="semibold">{totalTasks ? totalTasks : 0}</Text>
        </Flex>
      </Flex>
      <Stack direction="row" spacing="2" align="center">
        {children}
      </Stack>
    </Stack>
  );
}
