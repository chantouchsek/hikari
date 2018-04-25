<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Invite;
use App\Mail\InviteCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InviteController extends Controller
{
    public function invite()
    {
        return view('invite');
    }

    public function process(Request $request)
    {
        do {
            $token = str_random();
        } while (Invite::where('token', $token)->first());
        $invite = Invite::create([
            'email' => $request->get('email'),
            'token' => $token,
            'channel_id' => 1
        ]);
        Mail::to($request->get('email'))->send(new InviteCreated($invite, 'Channel name'));
        return redirect()->back();
    }

    public function accept($channelId, $token)
    {
        $invite = Invite::where('token', $token)
            ->where('channel_id', $channelId)
            ->first();
        if (!$invite) {
            abort(404);
        }
        $channel = Channel::with('group')->find($channelId)
            ->users()->wherePivot('is_joined', '=', 0)
            ->first()->pivot;
        $channel->is_joined = 1;
        $channel->save();
        $invite->delete();
        return response()->json([
            'error' => 0,
            'errorMessage' => 'Good job! Invite accepted!'
        ]);
    }
}
