import { createRoot } from "react-dom/client";
import TodoApp from "./components/TodoApp";
import "./style.css";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<TodoApp />);
