import { usePage, router } from "@inertiajs/react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getTaskPriorityValues } from "@/enums/TaskPriorityEnum";
import { getTaskStatusValues } from "@/enums/TaskStatusEnum";

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

    const { tasks } = usePage<PageProps>().props
    const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined } | undefined>(undefined)
    const [query, setQuery] = useState("")
    const [taskPriority, setTaskPriority] = useState("")
    const [taskStatus, setTaskStatus] = useState("")

    useEffect(() => {
        router.get(
            '/',
            {
                q: query,
                priority: taskPriority,
                status: taskStatus,
                startDate: range?.from,
                endDate: range?.to,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        )
    }, [range, query, taskPriority, taskStatus])

    const handleSelectRange = (selected: { from?: Date; to?: Date } | undefined) => {
        setRange(selected ? { from: selected.from, to: selected.to } : undefined)
    }

    return (
        <AppLayout>

            <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-1 items-center justify-between *:gap-2 space-x-2">
                    <div className="flex flex-col w-[40%]">
                        <Label>
                            Pesquisa:
                        </Label>
                        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-[20%]">
                        <Label>
                            Periodo
                        </Label>
                        <div className="flex items-center w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant='outline'>
                                        <CalendarTodayIcon className="w-4 h-4" />
                                        {range?.from && range?.to
                                            ? `${range.from.toLocaleDateString('pt-BR')} - ${range.to.toLocaleDateString('pt-BR')}`
                                            : 'Selecione o período'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
                                    <Calendar
                                        className='w-full'
                                        mode='range'
                                        defaultMonth={range?.from}
                                        selected={range}
                                        onSelect={handleSelectRange}
                                        disabled={{
                                            after: new Date(),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>

                            {range?.from && range?.to && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-4 text-muted-foreground"
                                    onClick={() => setRange(undefined)}
                                >
                                    <ClearIcon className="w-3 h-3" />
                                </Button>
                            )}
                        </div>


                    </div>
                    <div className="flex flex-col w-[15%]">
                        <Label>
                            Status
                        </Label>
                        <Select value={taskStatus} onValueChange={setTaskStatus}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {getTaskStatusValues().map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col w-[15%]">
                        <Label>
                            Prioridade
                        </Label>
                        <Select value={taskPriority} onValueChange={setTaskPriority}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {getTaskPriorityValues().map((priority) => (
                                        <SelectItem key={priority} value={priority}>
                                            {priority}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-end justify-center w-[10%] h-14 ">
                    <Button>
                        Nova tarefa
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[8%]">N°</TableHead>
                            <TableHead className="w-[44%]">Título</TableHead>
                            <TableHead className="w-[14%]">Data</TableHead>
                            <TableHead className="w-[14%]">Status</TableHead>
                            <TableHead className="w-[14%]">Prioridade</TableHead>
                            <TableHead className="w-[6%]" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                                    Nenhuma tarefa encontrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tasks.data.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell className="w-[8%]">{task.number}</TableCell>
                                    <TableCell className="w-[44%]">{task.title}</TableCell>
                                    <TableCell className="w-[14%]">
                                        {new Date(task.created_at).toLocaleDateString("pt-BR")}
                                    </TableCell>
                                    <TableCell className="w-[14%]">{task.status}</TableCell>
                                    <TableCell className="w-[14%]">{task.priority}</TableCell>
                                    <TableCell className="w-[6%]">
                                        <Button
                                            className="size-8"
                                            variant="destructive"
                                            onClick={() => alert("deletar tarefa")}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        {tasks.links.map((link, index) => (
                            <PaginationItem key={index}>
                                {link.label.includes("Previous") ? (
                                    <PaginationPrevious
                                        href={link.url ?? "#"}
                                        aria-disabled={!link.url}
                                        className={!link.url ? "pointer-events-none opacity-50" : ""}
                                    />
                                ) : link.label.includes("Next") ? (
                                    <PaginationNext
                                        href={link.url ?? "#"}
                                        aria-disabled={!link.url}
                                        className={!link.url ? "pointer-events-none opacity-50" : ""}
                                    />
                                ) : link.label === "&hellip;" ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href={link.url ?? "#"}
                                        isActive={link.active}
                                    >
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
