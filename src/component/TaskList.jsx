import React, { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import {
    CheckCircle2,
    Clock,
    PlayCircle,
    Search,
    Filter,
    ArrowUpDown,
    X,
    ListTodo,
    TrendingUp,
    Calendar,
    ChevronDown,
    ChevronUp,
    Pencil,
    Trash2,
    MoreHorizontal,
    AlertCircle,
    Plus
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import Button from "./Button";

function TaskList({ tasks, onEdit, onDelete }) {
    const { state, fun } = useContext(MyContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);

    // Filter and search tasks
    const filteredTasks = state?.allTask?.filter((item) => {
        const matchesSearch = item.taskName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || item.status === parseInt(statusFilter);
        return matchesSearch && matchesStatus;
    });

    // Sort tasks
    const sortedTasks = [...(filteredTasks || [])].sort((a, b) => {
        if (sortConfig.key === "createOn") {
            const dateA = new Date(a.createOn);
            const dateB = new Date(b.createOn);
            return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        }

        if (sortConfig.key === "taskName") {
            const nameA = a.taskName?.toLowerCase() || "";
            const nameB = b.taskName?.toLowerCase() || "";
            if (nameA < nameB) return sortConfig.direction === "asc" ? -1 : 1;
            if (nameA > nameB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
        });
    };

    const getStatusConfig = (status) => {
        const configs = {
            1: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
            2: { label: "Reject", color: "bg-red-50 text-red-700 border-red-200", icon: X },
            3: { label: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
        };
        return configs[status] || configs[1];
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <ArrowUpDown className="h-3.5 w-3.5" />;
        }
        return sortConfig.direction === "asc"
            ? <ChevronUp className="h-3.5 w-3.5" />
            : <ChevronDown className="h-3.5 w-3.5" />;
    };

    const toggleMenu = (taskId) => {
        setMenuOpen(menuOpen === taskId ? null : taskId);
    };




    return (
        <div>
            <div>

                {/* filters section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="1">Pending</option>
                                <option value="2">In Progress</option>
                                <option value="3">Completed</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchTerm || statusFilter !== "all") && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                            >
                                <X className="h-4 w-4" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Task Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    {["id", "taskName", "createOn", "status", "actions"].map((key) => (
                                        <th
                                            key={key}
                                            onClick={() => key !== "actions" && handleSort(key)}
                                            className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${key !== "actions" ? "cursor-pointer hover:bg-gray-100 transition group" : ""
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {key === "id" && "Task ID"}
                                                {key === "taskName" && "Task Name"}
                                                {key === "createOn" && (
                                                    <>
                                                        Created On
                                                        <Calendar className="h-3.5 w-3.5 ml-1 text-gray-400" />
                                                    </>
                                                )}
                                                {key === "status" && "Status"}
                                                {key === "actions" && "Actions"}
                                                {key !== "actions" && (
                                                    <span className="opacity-0 group-hover:opacity-100 transition">
                                                        {getSortIcon(key)}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sortedTasks?.length > 0 ? (
                                    sortedTasks.map((item) => {
                                        const statusConfig = getStatusConfig(item.status);
                                        const StatusIcon = statusConfig.icon;

                                        return (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 transition group"
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm font-medium text-gray-900">
                                                        #{item.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium capitalize text-gray-900">
                                                        {item.taskName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                        <div>
                                                            <div className="text-gray-700 text-sm">
                                                                {new Date(item.createOn).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })}
                                                            </div>
                                                            <div className="text-xs text-gray-400">
                                                                {new Date(item.createOn).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                                                    >
                                                        <StatusIcon className="h-3.5 w-3.5" />
                                                        {statusConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* Action Buttons */}
                                                    <div className="flex items-center gap-2">
                                                        {/* Edit Button */}
                                                        <button
                                                            onClick={() => {
                                                                fun.setTaskDetail(item);
                                                                fun.setOpen(true);
                                                            }}
                                                            className="p-1.5 cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition group/edit"
                                                            title="Edit task"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                fun.setTaskID(item.id);
                                                                fun.setIsOpen(true)
                                                            }}
                                                            className="p-1.5 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition group/delete"
                                                            title="Delete task"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="bg-gray-50 rounded-full p-4">
                                                    <ListTodo className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 font-medium">No tasks found</p>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {searchTerm || statusFilter !== "all"
                                                            ? "Try adjusting your filters"
                                                            : "Create your first task to get started"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer with Task Count */}
                    {sortedTasks?.length > 0 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-600">
                                        Showing {sortedTasks.length} of {state?.allTask?.length || 0} tasks
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-amber-500" />
                                        <span className="text-gray-600">
                                            {state?.allTask?.filter(t => t.status === 1).length || 0} Pending
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <PlayCircle className="h-4 w-4 text-blue-500" />
                                        <span className="text-gray-600">
                                            {state?.allTask?.filter(t => t.status === 2).length || 0} In Progress
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span className="text-gray-600">
                                            {state?.allTask?.filter(t => t.status === 3).length || 0} Completed
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskList;