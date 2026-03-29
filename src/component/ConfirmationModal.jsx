import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { MyContext } from "../context/MyContext";

function ConfirmationModal({ onClose, onConfirm, taskName }) {

    const { state } = useContext(MyContext);


    return (
        <AnimatePresence>
            {state.isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] bg-opacity-50 z-40"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                duration: 0.3
                            }}
                            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            delay: 0.15,
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                        className="bg-red-100 rounded-full p-2"
                                    >
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Delete Task
                                    </h3>
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition rounded-lg p-1 hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="p-6"
                            >
                                <p className="text-gray-600 mb-2">
                                    Are you sure you want to delete this task?
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    This action cannot be undone.
                                </p>
                                {taskName && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                                        <p className="text-sm font-medium text-gray-700">Task:</p>
                                        <p className="text-gray-900 font-medium">{taskName}</p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Footer */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="flex gap-3 p-6 pt-0"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ backgroundColor: "#ef4444" }}
                                    onClick={onConfirm}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Delete Task
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ConfirmationModal;