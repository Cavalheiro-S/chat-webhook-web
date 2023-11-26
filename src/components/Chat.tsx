import { SendOutlined } from "@ant-design/icons"
import { Card, Input } from "antd"

export const Chat = () => {


    const messages = [
        {
            text: "Mussum Ipsum, cacilds vidis litro abertis.  Atirei o pau no gatis, per gatis num morreus. Nulla id gravida magna, ut semper sapien. Delegadis gente finis, bibendum egestas augue arcu ut est. Suco de cevadiss deixa as pessoas mais interessantis.",
            time: "10:00",
            user: 1
        },
        {
            text: "Mensagem 1",
            time: "10:00",
            user: 2
        }
    ]
    const renderMessage = (message: { text: string, time: string, user: number }) => {
        return (
            <div className={`flex justify-between items-center gap-4 max-w-[70%] ${message.user === 1 ? "self-start" : "self-end"}`}>
                <span
                    key={message.text + message.time}
                    className={`${message.user === 1 ? "bg-blue-200" : "bg-red-200"} p-4 rounded`}>
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
            <Input size="large" placeholder="Digite uma mensagem" addonAfter={<SendOutlined className="hover:text-blue-600 hover:cursor-pointer" />} />
        </Card>
    )
}