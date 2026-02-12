import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Textarea } from "@/components/ui/textarea";

import { TaskPriorityEnum } from "@/enums/TaskPriorityEnum";

export default function NewTask() {
    const formNewTask = useForm({
        title: "",
        describe: "",
        priority: TaskPriorityEnum.LOW
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Nova Tarefa</Button>
            </SheetTrigger>
            <SheetContent className="min-w-[40vw]" side="left">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl text-center">Nova Tarefa</SheetTitle>
                </SheetHeader>
                <form action="bg-red-100">
                    <FieldGroup className="flex p-4">
                        <Field>
                            <FieldLabel htmlFor="title" className="font-semibold">Titulo:</FieldLabel>
                            <Textarea value={formNewTask.data.title} onChange={ (e) => formNewTask.setData("title", e.target.value)} id="title" rows={2} maxLength={128} style={{ resize: "none" }}></Textarea>
                        </Field>
                        <Field>
                            <Label className="font-semibold">
                                Prioridade
                            </Label>
                            <Select value={formNewTask.data.priority} onValueChange={(value) => formNewTask.setData("priority", value as TaskPriorityEnum)}>
                                <SelectTrigger font-semibold text-xl className="w-full">
                                    <SelectValue placeholder="Escolha o grau de urgencia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={TaskPriorityEnum.LOW}>Baixa</SelectItem>
                                        <SelectItem value={TaskPriorityEnum.MEDIUM}>Media</SelectItem>
                                        <SelectItem value={TaskPriorityEnum.HIGH}>Alta</SelectItem>
                                        <SelectItem value={TaskPriorityEnum.URGENT}>Urgente</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label className="font-semibold">
                                Descrição:
                            </Label>
                            <Textarea value={formNewTask.data.describe} onChange={ (e) => formNewTask.setData("describe", e.target.value)} id="title" cols={10} rows={10} maxLength={500} style={{ resize: "none" }}></Textarea>
                        </Field>
                    </FieldGroup>
                </form>
                <SheetFooter>
                    <Button type="submit">Salvar</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Fechar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}