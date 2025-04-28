import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Menu, X } from "lucide-react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [darkMode, setDarkMode] = useState(true);

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
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}

            <aside className="relative w-64 flex flex-col justify-between bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                {/* Top: Logo and Nav */}
                <div>
                    <div className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                        <Link href="/">
                            <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>
                    <div className="w-full items-center justify-center flex flex-col mt-4">
                        <button
                            onClick={toggleDarkMode}
                            className="rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white ring-1 ring-black/10 dark:ring-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                    <div className=" bg-gray-700 mt-4">
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </NavLink>
                    </div>
                    <div className=" bg-gray-700 mt-4">
                        <NavLink
                            href={route("client.index")}
                            active={route().current("client.index")}
                        >
                            Client
                        </NavLink>
                    </div>
                </div>
                <div className="relative px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <Link
                            href={route("profile.edit")}
                            className="block py-2 bg-gray-700 text-sm text-white hover:bg-red-300 dark:text-gray-300 dark:hover:bg-gray-600 w-full text-center"
                        >
                            {user.name}
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="block py-2 mt-6 text-sm text-white bg-red-700 hover:bg-red-300 dark:text-gray-300 dark:hover:bg-red-500 w-full"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        {header}
                    </header>
                )}

                <main className="">{children}</main>
            </div>
        </div>
    );
}
