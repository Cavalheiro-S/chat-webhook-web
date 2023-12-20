"use client"

import { Chat } from "@/components/Chat";
import { UserContext, UserContextProvider } from "@/context/user-context";
import { api } from "@/service/api";
import { Menu, MenuProps } from "antd";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const [friends, setFriends] = useState<User[]>([])
  const { user } = useContext(UserContext)

  const loadFriendList = async () => {
    const response = await api.get<User[]>(`/friend/all/${user?.id}`)
    console.log(response);
    
    if (response.status === 200)
      setFriends(response.data)
  }
  useEffect(() => {
    loadFriendList()
  }, [user])

  const friendList: MenuProps["items"] = [
    {
      label: 'Amigos',
      key: "friendsList",
      children: friends.map(friend => ({
        type: "group",
        label: friend.name,
      }))
    }
  ]
  return (
    <main className="min-h-screen flex items-center justify-center gap-4">
      <Menu
        className="w-52 h-full"
        mode="inline"
        items={friendList}
        defaultOpenKeys={["friendsList"]} />
      <Chat />
    </main >
  )
}
