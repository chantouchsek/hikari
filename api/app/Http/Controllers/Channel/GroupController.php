<?php

namespace App\Http\Controllers\Channel;

use App\Http\Requests\Channel\ShowRequest;
use App\Models\Channel;
use App\Transformers\GroupTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class GroupController extends Controller
{
    /**
     * @var GroupTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * The constructor for the controller.
     *
     * @param GroupTransformer $transformer The transformer used to transform the model.
     */
    public function __construct(GroupTransformer $transformer)
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
        $group = $channel->group;

        return $this->respond($this->transformer->transform($group));
    }
}
