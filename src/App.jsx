import React, { useContext } from 'react'
import { MyContext } from './context/MyContext'
import Header from './component/Header';
import Button from './component/Button';
import { CheckCircle2, Clock, PlayCircle, Plus } from 'lucide-react';
import TaskForm from './models/TaskForm';
import TaskList from './component/TaskList';
import ConfirmationModal from './component/ConfirmationModal';


function App() {

  const { state, fun } = useContext(MyContext);


  const onClose = () => {
    fun.setTaskID(null);
    fun.setIsOpen(false)
  }

  const handelDelete = () => {

    let newDate = [...state.allTask];
    newDate = newDate.filter(ta => ta.id !== state.taskID)

    fun.setAllTask(newDate);
    onClose()
  }


  return (
    <div className='max-w-[1440px] mx-auto pt-4 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-gray-100 mt-4 rounded-xl'>

      {
        state.isOpen &&
        <ConfirmationModal open={state.isOpen} onClose={onClose} onConfirm={handelDelete} />
      }

      {
        state?.open && (
          <TaskForm />
        )
      }

      <div className='mb-4'>
        <Header title={'Task Management'} dis="Manage and track all your tasks efficiently">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* <div>
              <div className="flex items-center gap-2 mb-1">
                <ListTodo className="h-7 w-7 text-blue-600" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Task Management
                </h1>
              </div>
              <p className="text-gray-600 ml-9">
                Manage and track all your tasks efficiently
              </p>
            </div> */}

            {/* Quick Stats */}
            <div className="flex gap-3">
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Pending: {state?.allTask?.filter(t => t.status === 1).length || 0}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Active: {state?.allTask?.filter(t => t.status === 2).length || 0}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Done: {state?.allTask?.filter(t => t.status === 3).length || 0}
                  </span>
                </div>
              </div>
              <div>
                <Button onClick={() => {
                  fun.setOpen(true);
                }}>
                  <Plus className='w-4' />  Add Task
                </Button>
              </div>
            </div>
          </div>
        </Header>
      </div>

      <div>
        <TaskList />
      </div>
    </div>
  )
}

export default App

