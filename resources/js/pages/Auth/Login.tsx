import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { z } from "zod";
import { login } from "@/actions/App/Http/Controllers/Auth/LoginController";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

        if (result.success === false) {
            const errors = result.error.flatten().fieldErrors;
            formLogin.setError(errors as Record<string, string[]>)
        } else {
            formLogin.post(login.url(), {
                onFinish: () => formLogin.setData(`password`, ``)
            })
        }
    }

    return (
        <main className="flex items-center justify-between *:min-h-screen">
            <div className="bg-blue-200 w-[50%] flex justify-center items-center">
                banner
            </div>
            <div className="w-[50%] flex justify-center items-center">
                <form className="w-[50%] space-y-4" onSubmit={submit}>
                    <h1 className="text-4xl font-bold text-center">LOGIN</h1>
                    <FieldGroup className="gap-4">
                        <Field>
                            <FieldLabel htmlFor="email">Email:</FieldLabel>
                            <Input id="email" value={formLogin.data.email} onChange={(e) => formLogin.setData("email", e.target.value)} />
                            <FieldError>{formLogin.errors.email}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Senha:</FieldLabel>
                            <Input id="password" type="password" value={formLogin.data.password} onChange={(e) => formLogin.setData("password", e.target.value)} />
                            <FieldError>{formLogin.errors.password}</FieldError>
                        </Field>
                        <Field>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formLogin.data.remember}
                                        onCheckedChange={(checked) =>
                                            formLogin.setData("remember", checked)
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
                            <Button>Login</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </main>
    )
}