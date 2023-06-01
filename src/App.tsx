import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./styles/theme";
import { AlertContextProvider } from "./context/AlertContext";
import MainRoutes from "./Routes/Route";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AlertContextProvider>
        <MainRoutes />
      </AlertContextProvider>
    </ChakraProvider>
  );
}

export default App;
