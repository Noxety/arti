import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { FaPen } from "react-icons/fa";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

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

                    <div className=" bg-gray-700 mt-4">
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </div>

                {/* Bottom: Profile Dropdown */}
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
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
