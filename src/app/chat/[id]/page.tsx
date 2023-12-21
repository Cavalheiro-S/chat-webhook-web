import { Chat } from "@/components/Chat";


export default function Page({ params }: { params: { id: string } }) {

    return <Chat chatId={params.id} />
}