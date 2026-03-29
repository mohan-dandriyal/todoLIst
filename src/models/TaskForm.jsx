
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../newTns/src/components/ui";
import { X } from "lucide-react";
import { MyContext } from "../context/MyContext";

function TaskForm() {

    const { state, fun } = useContext(MyContext);

    const [payload, setPayload] = useState({
        id: null,
        taskName: "",
        createOn: new Date(),
        status: 1,
    });
    const [loading, setLoading] = useState();
    const [nameError, setNameError] = useState();


    const closeForm = () => {
        fun.setOpen(false)
        setPayload(prev => ({...prev,
            taskName : "",
            id : null
        }));
        fun.setTaskDetail('')
    }

    const handleChange = (e) => {
        let { id, value } = e.target;
        setPayload({
            ...payload,
            [id]: value,
        });

        let isTrue = false;
        switch (id) {
            case "taskName":
                if (payload.taskName?.length < 1) {
                    setNameError("task name is required!")
                    isTrue = false
                } else {
                    setNameError('')
                    isTrue = true
                }
                break;
            case "status":
                isTrue = true
                break;
            default: isTrue = true
        }
        return isTrue
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isName = handleChange({ target: { id: "taskName", value: payload?.taskName } })

        if (isName) {
            if (payload?.id) {
                const newPayload = state?.allTask?.map(item =>
                    item.id === payload.id
                        ? { ...item, ...payload }
                        : item
                );

                fun?.setAllTask(newPayload);
            } else {
                let newPaylod = payload;
                newPaylod.id = state?.allTask?.length + 1
                fun?.setAllTask(prev => [...prev, newPaylod])
            }

            closeForm()

        } else {
            alert('faild')
        }
    };

    useEffect(() => {
        if (state.taskDetail) {
            setPayload(state.taskDetail)
        }
    }, [state.taskDetail])


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
            {/* Modal */}
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-[420px] rounded-2xl shadow-xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-semibold">Create Task</h2>
                    <button onClick={closeForm} className="c cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Task Name */}
                    <div>
                        <label className="text-sm font-medium mb-1 block">
                            Task Name
                            <span className="text-red-400 text-xs italic">* </span>
                        </label>
                        <Input
                            id={'taskName'}
                            placeholder="Enter task name..."
                            value={payload.taskName}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 text-xs italic">{nameError} </p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-sm font-medium mb-1 block">
                            Status
                        </label>
                        <SelectField
                            id={'status'}
                            value={payload.status}
                            onChange={(e) =>
                                setPayload({ ...payload, status: Number(e.target.value) })
                            }
                        >
                            <option value={1}>Pending</option>
                            <option value={2}>Reject</option>
                            <option value={3}>Completed</option>
                        </SelectField>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeForm}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>Save Task</Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default TaskForm;

export function Input(props) {
    return (
        <input
            {...props}
            className={`border w-full border-slate-200 dark:border-white/20 rounded-xl px-2.5 py-1.5 text-[12.5px] bg-white/90 dark:bg-white/10 outline-none focus:ring-1 focus:ring-blue-500/40 ${props.className || ""}`}
        />
    );
}

export function SelectField(props) {
    return (
        <select
            {...props}
            className={`border w-full border-slate-200 dark:border-white/20 rounded-xl px-2.5 py-1.5 text-[12.5px] bg-white/90 dark:bg-white/10 outline-none focus:ring-1 focus:ring-blue-500/40 ${props.className || ""}`}
        />
    );
}