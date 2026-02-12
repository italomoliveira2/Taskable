<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render("auth/login");
    }

    public function login(Request $request)
    {
        $credentials = $request->only(["email", "password"]);
        $remember = $request->boolean('remember');
        
        if(Auth::attempt( $credentials, $remember) == false)
        {
            return back()->withErrors([
                'email' => 'Credenciais inválidas.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route("home"));
    }
}
