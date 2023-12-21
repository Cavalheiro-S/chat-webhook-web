'use client'

import { UserContext } from "@/context/user-context"
import { api } from "@/service/api"
import { Menu, MenuProps } from "antd"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"

type Friend = User & {
    chatId: string
}

export const SideMenu = () => {
    const [friends, setFriends] = useState<Friend[]>([])
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

    const friendList: MenuProps["items"] = [
        {
            label: 'Amigos',
            key: "friendsList",
            children: friends.map(friend => ({
                label: friend.name,
                key: friend.id,
                onClick: () => {
                    router.push(`/chat/${friend.chatId}`)
                },
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