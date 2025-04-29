import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Filter, Plus, Search, Settings } from "lucide-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../Components/DataTable";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Slide, toast, ToastContainer } from "react-toastify";

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    createdBy: string | null;
    created_at: string;
    updatedBy: string | null;
    updated_at: string;
    deletedBy: string | null;
    deleted_at: string | null;
    isActive: number;
}

export const columns: ColumnDef<Client>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "updateAction",
        header: "Update",
        cell: ({ row }) => {
            const value = row.original;
            const {
                register,
                handleSubmit,
                formState: { errors },
                reset,
            } = useForm({
                defaultValues: value,
            });
            useEffect(() => {
                if (value) {
                    reset(value);
                }
            }, [value, reset]);
            const onSubmit = async (data: Client) => {
                try {
                    const response = await axios.put(
                        route("client.update", data.id),
                        data
                    );

                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.reload(); // Full reload
                    }, 800);
                } catch (error: any) {
                    console.error(error);

                    if (error.response) {
                        toast.error(
                            error.response.data.message ||
                                "Failed to update client."
                        );
                    } else {
                        toast.error("An error occurred. Please try again.");
                    }
                }
            };

            return (
                <>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Slide}
                    />
                    <Dialog>
                        <DialogTrigger>
                            <FaPen />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Client</DialogTitle>
                                <DialogContent>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="w-full mx-auto p-6 space-y-6"
                                    >
                                        {/* Name */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required:
                                                        "Name is required",
                                                })}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register("email", {
                                                    required:
                                                        "Email is required",
                                                })}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                {...register("phone")}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                        </div>

                                        {/* Company Name */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("companyName")}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                        </div>

                                        {/* Company Address */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Company Address
                                            </label>
                                            <input
                                                type="text"
                                                {...register("companyAddress")}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                        </div>

                                        {/* Company Phone */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Company Phone
                                            </label>
                                            <input
                                                type="text"
                                                {...register("companyPhone")}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                        </div>

                                        {/* Company Email */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                                Company Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register("companyEmail")}
                                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                            />
                                        </div>

                                        {/* Active Status */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                {...register("isActive")}
                                                className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label className="text-gray-700 dark:text-gray-300">
                                                Active
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <div>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                            >
                                                Update Client
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const value = row.original;
            const handleDelete = async (id: string) => {
                if (!confirm("Are you sure you want to delete this client?"))
                    return;

                try {
                    const response = await axios.delete(
                        route("client.destroy", id)
                    );

                    toast.success(
                        response.data.message || "Client deleted successfully"
                    );

                    // Reload to reflect changes
                    setTimeout(() => {
                        window.location.reload();
                    }, 800);
                } catch (error: any) {
                    console.error(error);
                    toast.error(
                        error.response?.data?.message ||
                            "Failed to delete client. Please try again."
                    );
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(value.email)
                            }
                        >
                            Copy email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Client</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDelete(value.id)}
                            className="text-red-500 cursor-pointer"
                        >
                            Delete Client
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function ClientIndex({ auth, message }: any) {
    const [clients, setClients] = useState<Client[]>([]);

    const fetchClients = async () => {
        try {
            const response = await axios.get("client.getallClients", {
                headers: {
                    Accept: "application/json",
                },
            });
            setClients(response.data.clients);
            console.log(clients[0]);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    {/* Left - Title */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Client
                        </h2>
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
            <div className="px-12">
                <DataTable columns={columns} data={clients} />
            </div>
        </AuthenticatedLayout>
    );
}
