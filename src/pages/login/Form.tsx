import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiAtSign, FiLock, FiUser } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getEncrypted } from "../../utils/crypto";
import { Api } from "../../service/ApiConfig";

export function Form() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  const submitData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = {
        login,
        password,
      };

      const res = await Api().post("/login", user);
      if (res.data) {
        const user = res.data;
        const cryptoData = getEncrypted({ user, permissao: 1 });
        localStorage.setItem("user", cryptoData);
        navigate("/task");
      } else {
        throw new Error("invalido");
      }
    } catch (error: any) {
      toast({
        position: "top",
        description: "Credencias inválidas",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      direction="column"
      marginTop={{ md: 2, lg: 10 }}
    >
      <form onSubmit={submitData}>
        <Stack spacing="4" w="100%">
          <InputGroup size="lg">
            <InputLeftAddon borderColor="blackAlpha.500" color="gray.700">
              <FiUser />
            </InputLeftAddon>
            <Input
              borderColor="blackAlpha.500"
              type="text"
              placeholder="Usuário"
              color="black"
              onChange={(e) => setLogin(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputLeftAddon borderColor="blackAlpha.500" color="gray.700">
              <FiLock />
            </InputLeftAddon>
            <Input
              borderColor="blackAlpha.500"
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              color="black"
            />
          </InputGroup>
          <Button size="md" colorScheme="messenger" type="submit">
            Acessar
          </Button>
        </Stack>
      </form>
    </Flex>
  );
}
