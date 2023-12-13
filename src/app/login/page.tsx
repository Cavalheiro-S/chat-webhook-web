"use client"

import { api } from "@/service/api";
import { Button, Card, Form, Input, Typography } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
    username: string
    password: string
}

export default function Page() {
    const router = useRouter()
    const handleSubmit = async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password })
        if(response.status === 200)
            router.push("/")
    }
    return (
        <Card className="m-auto">
            <Form onFinish={values => handleSubmit(values.username, values.password)} className="flex flex-col w-80">
                <Typography.Paragraph className="text-lg">
                    Preencha seus dados para fazer login
                </Typography.Paragraph>
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="w-full">Login</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}