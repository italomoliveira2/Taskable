import { Link } from "@inertiajs/react";
import { logout } from "@/actions/App/Http/Controllers/Auth/LogoutController";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
    return (
        <header className="bg-slate-900 flex justify-between py-2 px-5 text-white">
            <div className="flex items-center">
                <a href="/">
                    <h1 className="text-gray-200 text-3xl font-bold">Taskable</h1>
                </a>
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 p-2 rounded-xl">
                                <span>Italo Oliveira</span>
                                <Avatar className="border-2 border-white">
                                    <AvatarImage />
                                    <AvatarFallback className="bg-orange-400 font-semibold text-black">
                                        IO
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href={"#"}>Perfil</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>    <Link
                                    href={logout.url()}
                                    method="post"
                                    as="button"
                                >
                                    Sair
                                </Link></DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}