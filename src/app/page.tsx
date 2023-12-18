"use client"

import { Chat } from "@/components/Chat";
import { UserContextProvider } from "@/context/user-context";
import { api } from "@/service/api";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";

export default function Home() {

  const [friends, setFriends] = useState<User[]>([])

  const loadFriendList = async () => {
    const response = await api.get<User[]>(`/friend/all/${"clq492vlv0000zvaek32gesi4"}`)
    if (response.status === 200)
      setFriends(response.data)
  }
  useEffect(() => {
    loadFriendList()
  }, [])

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
    <UserContextProvider>
      <main className="min-h-screen flex items-center justify-center gap-4">
        <Menu
          className="w-52 h-full"
          mode="inline"
          items={friendList}
          defaultOpenKeys={["friendsList"]} />
        <Chat />
      </main >
    </UserContextProvider>
  )
}
