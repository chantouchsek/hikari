<?php

namespace App\Http\Controllers\Channel;

use App\Http\Requests\Channel\ShowRequest;
use App\Models\Channel;
use App\Transformers\ChatMessageTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class ConversationsController extends Controller
{
    /**
     * @var ChatMessageTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * The constructor for the controller.
     *
     * @param ChatMessageTransformer $transformer The transformer used to transform the model.
     */
    public function __construct(ChatMessageTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Display the specified resource.
     *
     * @param ShowRequest $request
     * @param Channel $channel
     *
     * @return JsonResponse
     */
    public function show(ShowRequest $request, Channel $channel): JsonResponse
    {
        $conversations = $channel->conversations()
            ->orderBy('id', 'ASC')
            ->get();

        $data = $this->transformer->transformCollection(collect($conversations));

        return $this->respond($data->toArray());
    }
}
