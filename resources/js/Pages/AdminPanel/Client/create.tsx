import { useForm } from "react-hook-form";
import { Head, Link } from "@inertiajs/react"; // Assuming you're using Inertia.js
import { FaArrowLeft } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Slide, toast, ToastContainer } from "react-toastify";
import axios from "axios";

type ClientFormInputs = {
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
    companyAddress?: string;
    companyPhone?: string;
    companyEmail?: string;
    isActive: boolean;
};

export default function ClientCreate({ auth, message }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ClientFormInputs>();

    const onSubmit = async (data: ClientFormInputs) => {
        try {
            const response = await axios.post(route("client.store"), data);

            toast.success(response.data.message); // 🎉 success toast
            reset(); // Reset the form
        } catch (error: any) {
            console.error(error);

            if (error.response) {
                // Server responded with a status outside 2xx
                toast.error(
                    error.response.data.message || "Failed to create client."
                );
            } else {
                // No response (network error, etc.)
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="w-full flex items-center justify-between px-6 py-2 bg-gray-100 dark:bg-gray-800 shadow-sm">
                    {/* Left - Title */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Add Client
                        </h2>
                    </div>

                    {/* Right - Back Button */}
                    <div className="flex-1 flex justify-end gap-2">
                        <Link href={route("client.index")}>
                            <button className="p-2 rounded-sm bg-red-700 text-white hover:bg-red-700/80 transition">
                                <FaArrowLeft />
                            </button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Add Client" />
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
            {/* Form Section */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto p-6 space-y-6"
            >
                {/* Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
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
                            required: "Email is required",
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
                        Save Client
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
