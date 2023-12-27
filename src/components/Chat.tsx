"use client"

import { UserContext } from "@/context/user-context"
import { useSocket } from "@/hooks/useSocket"
import { SendOutlined } from "@ant-design/icons"
import { Card, Input } from "antd"
import { useCallback, useContext, useEffect, useState } from "react"

type Message = {
    id: string
    text: string
    createdAt: string
    userId: string
}

export const Chat = ({ friendId }: { friendId: string }) => {
    const { socket } = useSocket()
    const { user } = useContext(UserContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [messageInput, setMessageInput] = useState("")

    const handleMessages = useCallback(async () => {
        if (user?.id) {
            socket.emit("join-room", { userOneId: user.id, userTwoId: friendId })
            socket.on("previous-messages", (messages) => {
                setMessages(messages)
            })
            socket.on("receive-message", message => {
                console.log(message);
                setMessages(prev => [...prev, message])
            })
        }
    }, [user, socket, friendId])

    useEffect(() => {
        handleMessages()
        return () => {
            socket.emit("leave-room", { userOneId: user?.id, userTwoId: friendId })
            socket.removeAllListeners("receive-message")
            socket.removeAllListeners("previous-messages")
        }
    }, [])

    const handleSendMessage = () => {
        if (user?.id) {
            socket.emit("send-message", { message: messageInput, userOneId: user?.id, friendId })
            setMessageInput("")
        }
    }
    const renderMessage = (message: Message) => {
        return (
            <div key={message.id} className={`flex justify-between items-center gap-4 max-w-[70%] ${message.userId === user?.id ? "self-end" : "self-start"}`}>
                <span
                    className={`${message.userId === user?.id ? "bg-blue-200" : "bg-red-200"} p-4 rounded`}>
                    {message.text}
                </span>
                <span className="text-xs text-gray-500 self-end">{new Date(message.createdAt).toLocaleTimeString()}</span>
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
                onPressEnter={() => handleSendMessage()}
                addonAfter={
                    <SendOutlined
                        onClick={() => handleSendMessage()}
                        className="hover:text-blue-600 hover:cursor-pointer" />} />
        </Card>
    )
}