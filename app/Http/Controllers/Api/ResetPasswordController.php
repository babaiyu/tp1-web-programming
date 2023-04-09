<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $token)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:10|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $checkDB = DB::table('password_reset_tokens')->where([
            'email' => $request->input('email'),
            'token' => $token,
        ])->first();

        if (!$checkDB) {
            return response()->json([
                'success' => false,
                'message' => 'Email and tokens does not match!',
            ]);
        }

        User::where('email', $request->input('email'))
            ->update(['password' => bcrypt($request->input('password'))]);
        DB::table('password_reset_tokens')->where(['email' => $request->input('email')])->delete();

        return response()->json([
            'success' => true,
            'message' => 'Success reset password',
        ], 200);
    }
}
