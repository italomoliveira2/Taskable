import { usePage } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



type Task = {
    id: number
    number: number
    user_id: number
    title: string
    describe: string
    status: string
    priority: string
    deleted_at: string | null
    created_at: string
    updated_at: string
}

type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

type PaginatedResponse<T> = {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number | null
    to: number | null
    path: string
    links: PaginationLink[]
}

type User = {
    id: number
    name: string
    email: string
    phone: string
    status: string
    profile_photo: string
    config: {
        theme: string
        language: string
        timezone: string
        notifications: boolean
    }
    email_verified_at: string | null
    deleted_at: string | null
    created_at: string
    updated_at: string
}


type PageProps = {
    user: User
    tasks: PaginatedResponse<Task>
}

export default function Index() {

    const { user, tasks } = usePage<PageProps>().props

    const [query, setQuery] = useState("")

    return (
        <AppLayout>

            <div className="gap-4">
                <h1 className="text-2xl">Bom dia, {user.name}</h1>

                <div className="flex items-center justify-between">

                    <div className="w-[50%]">
                        <Input className="border-x-0 border-t-0 shadow-0" value={query} onChange={(event) => setQuery(event.target.value)} />
                    </div>

                    <div className="w-[50%]">
                        <Button>Criar Tarefa</Button>
                        
                    </div>
                </div>

            </div>

            <div className="space-y-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>N°</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks.data.map(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.number}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>
                                    {new Date(task.created_at).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>
                                    <Button
                                        className="size-8"
                                        variant="destructive"
                                        onClick={() => alert("deletar tarefa")}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        {tasks.links.map((link, index) => (
                            <PaginationItem key={index}>
                                {link.label.includes("Previous") ? (
                                    <PaginationPrevious href={link.url ?? "#"} />
                                ) : link.label.includes("Next") ? (
                                    <PaginationNext href={link.url ?? "#"} />
                                ) : link.label === "&hellip;" ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink href={link.url ?? "#"} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    )
}
