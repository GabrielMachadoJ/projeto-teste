import {
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <header>
      <Flex justify="flex-end" w="100vw" pr="1.5" h="3rem" bg="">
        <IconButton
          aria-label="Trocar entre modo claro e escuro"
          _hover={{
            background: "none",
            transform: "scale(1.2)",
            transition: "transform 0.2s ease-in-out",
          }}
          icon={<SwitchIcon />}
          size={"lg"}
          bg="none"
          onClick={toggleColorMode}
        />
        <IconButton
          as="a"
          href="/"
          aria-label="Botão de sair"
          icon={<FiLogOut />}
          _hover={{
            background: "none",
            transform: "scale(1.2)",
            transition: "transform 0.2s ease-in-out",
          }}
          size={"lg"}
          bg="none"
          onClick={() => {
            localStorage.clear();
          }}
        />
      </Flex>
    </header>
  );
}
