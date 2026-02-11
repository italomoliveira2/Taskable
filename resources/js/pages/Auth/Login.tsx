import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <main className="flex items-center justify-between *:min-h-screen">
            <div className="bg-blue-200 w-[50%] flex justify-center items-center">
                banner
            </div>
            <div className="w-[50%] flex justify-center items-center">
                <form className="w-[50%] space-y-4">
                    <h1 className="text-3xl font-bold text-center">LOGIN</h1>
                    <FieldGroup className="gap-4">
                        <Field>
                            <FieldLabel>Email:</FieldLabel>
                            <Input />
                            <FieldError/>
                        </Field>
                        <Field>
                            <FieldLabel>Senha:</FieldLabel>
                            <Input />
                            <FieldError></FieldError>
                        </Field>
                        <Field>
                            <div className="flex items-center justify-between text-sm">

                                <div className="flex items-center space-x-2">
                                    <Checkbox></Checkbox>
                                    <Label>Lembre de mim</Label>
                                </div>
                                <div>
                                    <Link>Esqueceu a senha?</Link>
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