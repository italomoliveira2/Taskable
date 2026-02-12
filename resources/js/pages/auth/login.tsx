import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { login } from "@/actions/App/Http/Controllers/Auth/LoginController";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/svgs/logo.svg";
import Banner from "@/svgs/next-tasks.svg";

const loginSchema = z.object({
    email: z.string()
        .min(1, `Email é obrigatório`)
        .email(`Email inválido`),

    password: z.string()
        .min(6, `Senha deve ter pelo menos 6 caracteres`),

    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {

    const formLogin = useForm<LoginFormData>({
        email: ``,
        password: ``,
        remember: false
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const result = loginSchema.safeParse(formLogin.data)

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            Object.values(errors).forEach((messages) => {
                messages?.forEach((message) => {
                    toast.error(message, { position: "top-right" });
                });
            });

        } else {
            formLogin.post(login.url(), {
                onError: (errors: Record<string, string>) => {
                    Object.values(errors).forEach((message) => {
                        toast.error(message, { position: "top-right" });
                    });
                },
                onFinish: () => formLogin.setData("password", ""),
            });
        }

    }

    return (
        <AuthLayout>
            <div className="bg-slate-900 w-[60%] flex justify-center items-center">
                <img src={Banner} className="h-125 w-auto" />
            </div>
            <div className="w-[40%] flex bg-black text-white flex-col justify-center items-center gap-12">
                <div className="flex items-center">
                    <img src={Logo} className="size-26" />
                    <h1 className="text-7xl">Taskable</h1>
                </div>
                <form className="w-[65%] space-y-4" onSubmit={submit}>
                    <FieldGroup className="gap-4">
                        <Field>
                            <FieldLabel htmlFor="email">Email:</FieldLabel>
                            <Input id="email" value={formLogin.data.email} onChange={(e) => formLogin.setData("email", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Senha:</FieldLabel>
                            <Input id="password" type="password" value={formLogin.data.password} onChange={(e) => formLogin.setData("password", e.target.value)} />
                        </Field>
                        <Field>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formLogin.data.remember as boolean}
                                        onCheckedChange={(checked) =>
                                            formLogin.setData("remember", checked === true)
                                        }
                                    />
                                    <Label htmlFor="remember">Lembre de mim</Label>
                                </div>
                                <div>
                                    <Link href={`#`}>Esqueceu a senha?</Link>
                                </div>
                            </div>
                        </Field>
                        <Field>
                            <Button className="bg-purple-600 hover:bg-purple-700 font-semibold hover:scale-102">Login</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </AuthLayout>
    )
}