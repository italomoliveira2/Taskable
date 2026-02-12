<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render("auth/register");
    }

    public function register()
    {

    }
}
