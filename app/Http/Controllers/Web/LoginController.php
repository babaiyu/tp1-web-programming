<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        $message = $request->query('message');
        $type = $request->query('type');

        return Inertia::render('LoginPage', [
            'errorMessage' => [
                'message' => $message,
                'type' => $type,
            ],
        ]);
    }
}
