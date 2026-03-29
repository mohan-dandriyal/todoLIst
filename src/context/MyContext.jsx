import { createContext, useState } from "react";

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskID, setTaskID] = useState(false);

  const [taskDetail, setTaskDetail] = useState()
  const [allTask, setAllTask] = useState([
    { id: 1, taskName: 'mohan', createOn: new Date(), status: 1 }
  ])

  const state = {
    open,
    allTask,
    taskDetail,
    isOpen,
    taskID
  };

  const fun = {
    setOpen,
    setAllTask,
    setTaskDetail,
    setIsOpen,
    setTaskID
  }

  return (
    <MyContext.Provider value={{ state, fun }}>
      {children}
    </MyContext.Provider>
  );
};