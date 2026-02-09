import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default function Index() {

    const { user, tasks } = usePage<{ user: User; tasks: Task[] }>().props;
    const [openRow, setOpenRow] = useState<number | null>(null);

    const toggleRow = (id: number) => {
        setOpenRow(openRow === id ? null : id);
    };

    return (
        <>
            <div>
                <h1 className="text-2x">Bom dia, {user.name}</h1>
            </div>

            <div className="px-4 py-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Num</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead> </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <>
                                <TableRow>
                                    <TableCell>{task.number}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => toggleRow(task.number)}>
                                            Modificar
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                {openRow === task.number && (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div style={{ padding: "16px" }}>
                                                <strong>Descrição:</strong> {task.describe} <br />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>

                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

type Task = {
    id: number;
    number: number;
    user_id: number;
    title: string;
    describe: string;
    status: string;
    priority: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
};

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    password: string;
    profile_photo: string;
    config: {
        theme: string;
        language: string;
        timezone: string;
        notifications: boolean;
    };
    email_verified_at: string;
    deleted_at: null;
    remember_token: string;
    created_at: string;
    updated_at: string;
};