import { Head, Link } from "@inertiajs/react";
import Chat from "../Components/Chat";
import { useEffect, useState } from "react";

export default function Welcome({ auth }: any) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* Navbar */}
                <header className="w-full px-6 py-6 border-b border-black/10 dark:border-white/10">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="text-xl font-semibold text-black dark:text-white">
                            Welcome
                        </div>
                        <nav className="flex space-x-4">
                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white ring-1 ring-transparent transition hover:text-black/70 dark:hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white ring-1 ring-transparent transition hover:text-black/70 dark:hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white ring-1 ring-transparent transition hover:text-black/70 dark:hover:text-white/80 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                        <button
                            onClick={toggleDarkMode}
                            className="rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white ring-1 ring-black/10 dark:ring-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            Welcome to Our Platform
                        </h1>
                        <p className="mt-4 text-base text-black/70 dark:text-white/60">
                            This is a modern responsive layout built with
                            Tailwind CSS and Inertia.js.
                        </p>
                    </div>
                    {/* {auth.user && <Chat user={auth.user} />} */}
                </main>

                {/* Footer */}
                <footer className="w-full py-6 text-center text-sm text-black/60 dark:text-white/60 border-t border-black/10 dark:border-white/10">
                    &copy; {new Date().getFullYear()} Your Company. All rights
                    reserved.
                </footer>
            </div>
        </>
    );
}
