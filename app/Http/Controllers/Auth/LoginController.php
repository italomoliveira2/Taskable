<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render("Auth/Login");
    }

    public function login(Request $request)
    {
        dd("chegou");
    }
}
