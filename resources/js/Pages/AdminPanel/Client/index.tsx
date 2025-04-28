import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Filter, Plus, Search, Settings } from "lucide-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table"

export default function ClientIndex({ auth, message,clients }: any) {
    const [client, setClients] = useState<Record<string, any>[]>([]); 
    console.log(clients);
    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get(route("client.getallClients"));
            setClients(response.data);
            console.log(response);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="w-full flex items-center justify-between px-6 py-2 bg-gray-100 dark:bg-gray-800 shadow-sm">
                    {/* Left - Title */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Client
                        </h2>
                    </div>

                    {/* Middle - Search */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-black dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Right - Icon Buttons */}
                    <div className="flex-1 flex justify-end gap-2">
                        <button className="p-2 rounded-sm bg-red-700 text-white dark:text-white hover:bg-red-700/80 transition">
                            <Link href={route("client.create")}>
                                <FaPlus />
                            </Link>
                        </button>

                        <button className="p-2 rounded-sm bg-red-700 text-white dark:text-white hover:bg-red-700/80 transition">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="ClientIndex" />
        </AuthenticatedLayout>
    );
}
