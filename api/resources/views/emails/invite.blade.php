<p>Hi,</p>

<p>Someone has invited you to join the {{ $channel->name }} channel.</p>

<a href="{{ route('accept', [$channel->id, $invite->token]) }}">Click here</a> to accept!