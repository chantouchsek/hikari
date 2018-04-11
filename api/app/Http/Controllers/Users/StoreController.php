<?php

namespace App\Http\Controllers\Users;

use App\Http\Requests\Store\ShowRequest;
use App\Models\User;
use App\Transformers\StoreTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
  /**
   * @var StoreTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * The constructor for the controller.
   *
   * @param StoreTransformer $transformer The transformer used to transform the model.
   */
  public function __construct(StoreTransformer $transformer)
  {
    $this->transformer = $transformer;
  }

  /**
   * Display the specified resource.
   *
   * @param ShowRequest $request
   * @param  User $user
   *
   * @return JsonResponse
   */
  public function show(ShowRequest $request, User $user): JsonResponse
  {
    $store = $user->store;

    return $this->respond($this->transformer->transform($store));
  }
}
