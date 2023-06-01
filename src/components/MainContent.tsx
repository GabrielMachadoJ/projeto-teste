import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "./Header";
interface MainContentProps {
  children: ReactNode;
  title: string;
}

export default function MainContent({ children, title }: MainContentProps) {
  return (
    <Grid
      templateAreas={`
      "header"
      "main"`}
      gridTemplateRows={"4vh 1fr"}
      h="100vh"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem
        area={"main"}
        boxShadow="0 0 12px 1px rgba(0, 0, 0, 0.15) inset"
        overflowY="auto"
      >
        <Box
          bg="whiteAlpha.100"
          w="100%"
          h="100%"
          justifyContent="center"
          display="flex"
          p="7"
        >
          <Card w="70%">
            <CardBody overflow="auto">
              <Flex pb=".5rem">
                <Text style={{ fontWeight: "" }} fontSize="3xl">
                  {title}
                </Text>
              </Flex>
              <Divider mb="2" />

              {children}
            </CardBody>
          </Card>
        </Box>
      </GridItem>
    </Grid>
  );
}
