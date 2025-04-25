import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";

interface Message {
    name: string;
    text: string;
}

interface ChatProps {
    user: {
        name: string;
    };
}

const Chat: React.FC<ChatProps> = ({ user }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        window.Echo.channel("messages").listen(".message.sent", (e: any) => {
            if (e.name === user.name || e.name === "Admin") {
                setMessages((prev) => [
                    ...prev,
                    { name: e.name, text: e.text },
                ]);
                if (e.name === "Admin") {
                    toast("New Message From " + e.name, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                    });
                }
            }
        });

        window.Echo.connector.pusher.connection.bind("connected", () => {
            console.log("Echo connected"); // Check if Echo is connected
        });

        return () => {
            window.Echo.leave("messages");
        };
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        await axios.post("/chat", { message });
        setMessage("");
    };

    return (
        <div className="fixed bottom-10 right-12 w-80 h-60">
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
            <div
                className={`transition-all duration-300 transform ${
                    open ? "translate-y-0" : "translate-y-full"
                } h-full`}
            >
                <div className="mb-2">
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full text-start flex items-center gap-2 py-2 px-3 text-sm text-white bg-red-600 rounded hover:bg-red-500"
                    >
                        Chat
                        <span className="ml-auto">{open ? "▼" : "▲"}</span>
                    </button>
                </div>
                {open && (
                    <div className="w-full h-full bg-white border rounded flex flex-col overflow-hidden shadow">
                        <div
                            ref={chatBoxRef}
                            className="flex-1 p-3 text-sm overflow-y-auto"
                        >
                            {messages.map((msg, index) => (
                                <div key={index}>
                                    <span className="text-red-600 font-semibold">
                                        {msg.name}:
                                    </span>{" "}
                                    <span className="text-black">
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <form
                            onSubmit={sendMessage}
                            className="p-2 border-t flex gap-2"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 px-2 py-1 border rounded text-black"
                                placeholder="Type your message"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
