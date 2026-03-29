import React from 'react'

function Button({ children, disabled, className, onClick }) {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex cursor-pointer disabled:cursor-progress items-center gap-1 rounded-xl text-xs transition duration-200 ease -out active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 h-9 rounded-xl ${className}`}>
            {children}
        </button>
    )
}

export default Button