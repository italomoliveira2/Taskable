import { usePage } from "@inertiajs/react";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
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
        <AppLayout>
            <div>
                <h1 className="text-2x">Bom dia, {user.name}</h1>
            </div>

            <div className="px-4 py-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Num</TableHead>
                            <TableHead>Titulo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <>
                                <TableRow>
                                    <TableCell>
                                        <Button variant={`ghost`} onClick={() => toggleRow(task.number)}>
                                            <VisibilityIcon />
                                        </Button></TableCell>
                                    <TableCell>{task.number}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-4">
                                            <Button className="size-8" variant={`destructive`} onClick={() => alert('deletar tarefa')}>
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {openRow === task.number && (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <div className="p-4">
                                                <h1>Descrição: </h1>
                                                <span className="block wrap-break-word whitespace-pre-wrap">
                                                    {task.describe}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>

                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
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