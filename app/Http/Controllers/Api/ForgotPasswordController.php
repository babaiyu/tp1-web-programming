<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->input('email'))->first();

        if ($user == null) {
            return response()->json([
                'success' => false,
                'message' => 'User not found!',
            ], 404);
        }

        $token = Str::random(64);
        $link = '/' . 'reset-password/' . $token . '/' . $request->input('email');
        $checkDB = DB::table('password_reset_tokens')->where('email', $request->input('email'))->first();

        // Mail::to($request->input('email'))
        //     ->send(new ResetPasswordMail($request->input('email'), $link));

        if ($checkDB != null) {
            DB::table('password_reset_tokens')->where('email', $request->input('email'))->update(['token' => $token]);

            return response()->json([
                'success' => true,
                'message' => 'Success send reset password link',
                'link' => $link,
            ]);
        }

        $saveDB = DB::table('password_reset_tokens')->insert([
            'email' => $request->input('email'),
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        if ($saveDB) {
            // Mail::send(
            //     'mails.resetpassword',
            //     [
            //         'email' => $request->input('email'),
            //         'resetLink' => $link
            //     ],
            //     function ($message) use ($request) {
            //         $message->to($request->input('email'));
            //         $message->subject('Reset password!');
            //     }
            // );

            return response()->json([
                'success' => true,
                'message' => 'Success generate response',
                'link' => $link,
            ]);
        }

        // Mail::send('email.forgotPassword', ['token' => $token], function ($message) use ($request) {
        //     $message->to($request->input('email'));
        //     $message->subject('Reset Password - TP2 Autentikasi Laravel');
        // });
    }
}
