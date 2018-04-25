<?php

namespace App\Mail;

use App\Models\Channel;
use App\Models\Invite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InviteCreated extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $invite;
    public $channel;

    /**
     * Create a new message instance.
     *
     * @param Invite $invite
     * @param Channel $channel
     */

    public function __construct(Invite $invite, Channel $channel = null)
    {
        $this->invite = $invite;
        $this->channel = $channel;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('you@example.com')
            ->view('emails.invite');
    }
}
