import { Card, CardBody, Flex, Text, useToast } from "@chakra-ui/react";
import { Form } from "./Form";

export function LoginPage() {
  return (
    <Flex bg="darkgrey" align="center" justify="center" w="100vw" h="100vh">
      <Card style={{ borderRadius: "1rem" }} w="30rem" h="30rem">
        <CardBody style={{ borderRadius: "1rem" }} bg="red.50">
          <Flex h="100%" direction="column" align="center" justify="center">
            <Text textAlign="center" fontSize="3xl">
              Login
            </Text>
            <Form />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
