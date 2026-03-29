import React from 'react'

function Header({children, title, dis}) {
    return (
        <header className="rounded-xl p-0 me-2 shadow-sm border border-white/60 dark:border-white/10  bg-white/80 dark:bg-white/5">
            <div className="hidden sm:flex items-center gap-2 px-3 pt-2 pb-1 border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]">
                    </span><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
                </div>
                <div className="mx-auto text-[11px] tracking-wide text-slate-500 dark:text-slate-400">Todo App</div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 px-3 sm:px-4 py-2.5">
                <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white text-[11px]">TS</div>
                    <div>
                        <h2 className="text-[15px] sm:text-base md:text-lg font-semibold tracking-tight">{title}</h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{dis}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header