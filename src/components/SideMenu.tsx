'use client'

import { UserContext } from "@/context/user-context"
import { useSocket } from "@/hooks/useSocket"
import { api } from "@/service/api"
import { Menu, MenuProps } from "antd"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"

type Friend = User & {
    chatId: string
}

export const SideMenu = () => {
    const [friends, setFriends] = useState<Friend[]>([])
    const { socket } = useSocket()
    const { user } = useContext(UserContext)
    const router = useRouter()

    const loadFriendList = useCallback(async () => {
        const response = await api.get<Friend[]>(`/friend/all/${user?.id}`)
        if (response.status === 200)
            setFriends(response.data)
    }, [user?.id])

    useEffect(() => {
        user?.id && loadFriendList()
    }, [user])

    const handleMenuItemClick = (id: string) => {
        router.push(`/chat/${id}`)
    }

    const friendList: MenuProps["items"] = [
        {
            label: "Logado como: " + user?.name,
            key: "user",
            type: "group",
        },
        {
            label: 'Amigos',
            key: "friendsList",
            children: friends.map(friend => ({
                label: friend.name,
                key: friend.id,
                onClick: () => { handleMenuItemClick(friend.id) },
            }))
        }
    ]
    return user && (
        <Menu
            className="w-52 h-full"
            mode="inline"
            items={friendList} />
    )
}