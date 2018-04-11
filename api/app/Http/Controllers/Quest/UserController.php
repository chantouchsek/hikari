<?php

namespace App\Http\Controllers\Quest;

use App\Http\Requests\Quest\ShowRequest;
use App\Models\Quest;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
  /**
   * @var UserTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * The constructor for the controller.
   *
   * @param UserTransformer $transformer The transformer used to transform the model.
   */
  public function __construct(UserTransformer $transformer)
  {
    $this->transformer = $transformer;
  }

  /**
   * Display the specified resource.
   *
   * @param ShowRequest $request
   * @param Quest $quest
   *
   * @return JsonResponse
   */
  public function show(ShowRequest $request, Quest $quest): JsonResponse
  {
    $user = $quest->user;

    return $this->respond($this->transformer->transform($user));
  }
}
