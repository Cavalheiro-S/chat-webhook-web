"use client"

import { UserContext } from "@/context/user-context"
import { useSocket } from "@/hooks/useSocket"
import { SendOutlined } from "@ant-design/icons"
import { Card, Input } from "antd"
import { useContext, useEffect, useState } from "react"

type Message = {
    text: string
    time: string
    userId: string
}

export const Chat = ({ chatId }: { chatId: string }) => {
    const { socket } = useSocket()
    const { user } = useContext(UserContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [messageInput, setMessageInput] = useState("")

    useEffect(() => {

        if (user?.id) {
            socket.emit("join", user?.id)
            socket.on("chat-" + chatId, (message) => {
                console.log(message);
                // setMessages(prev => [...prev, { text: message.text, userId: message.id, time: new Date().toLocaleTimeString() }])
            })

        }

    }, [user])
    const renderMessage = (message: Message) => {
        return (
            <div key={message.userId + message.time} className={`flex justify-between items-center gap-4 max-w-[70%] ${message.userId === user?.id ? "self-start" : "self-end"}`}>
                <span
                    className={`${message.userId === user?.id ? "bg-blue-200" : "bg-red-200"} p-4 rounded`}>
                    {message.text}
                </span>
                <span className="text-xs text-gray-500 self-end">{message.time}</span>
            </div>
        )
    }
    return (
        <Card className="w-[600px]" bodyStyle={{ width: "100%" }}>
            <h2 className="text-xl font-semibold">Chat</h2>
            <div className="flex flex-col py-4 gap-2">
                {messages.map(renderMessage)}
            </div>
            <Input
                size="large"
                placeholder="Digite uma mensagem"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                addonAfter={
                    <SendOutlined
                        onClick={() => socket.emit("chat message", { message: messageInput, userId: user?.id })}
                        className="hover:text-blue-600 hover:cursor-pointer" />} />
        </Card>
    )
}