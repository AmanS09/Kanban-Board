import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react";
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </DndProvider>
  </StrictMode>
);
