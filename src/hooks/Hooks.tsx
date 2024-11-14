import { useContext } from "react";
import { TaskContext } from "../context/Context";

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context;
};