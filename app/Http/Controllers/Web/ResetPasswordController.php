<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    public function index(Request $request, string $token, string $email)
    {
        return Inertia::render('ResetPasswordPage', [
            'email' => $email,
            'token' => $token,
        ]);
    }
}
