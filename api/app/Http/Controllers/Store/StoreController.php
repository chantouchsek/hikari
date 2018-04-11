<?php

namespace App\Http\Controllers\Store;

use App\Http\Requests\Store\ShowRequest;
use App\Models\Store;
use App\Transformers\StoreTransformer;
use App\Transformers\UserTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
  /**
   * @var UserTransformer The transformer used to transform the model.
   */
  protected $userTransformer;

  /**
   * @var UserTransformer The transformer used to transform the model.
   */
  protected $storeTransformer;


  /**
   * The constructor for the controller.
   *
   * @param UserTransformer $userTransformer The transformer used to transform the model.
   * @param StoreTransformer $storeTransformer The transformer used to transform the model.
   */
  public function __construct(UserTransformer $userTransformer, StoreTransformer $storeTransformer)
  {
    $this->userTransformer = $userTransformer;
    $this->storeTransformer = $storeTransformer;
  }


  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index(): JsonResponse
  {
    $pagination = Store::with('staffs')->get();

    $data = $this->storeTransformer->transformCollection(collect($pagination));

    return $this->respond($pagination, [
      'data' => $data
    ]);
  }

  /**
   * Display the specified resource.
   *
   * @param ShowRequest $request
   * @param Store $store
   *
   * @return JsonResponse
   */
  public function show(ShowRequest $request, Store $store): JsonResponse
  {
    $users = $store->user;

    return $this->respond($this->userTransformer->transform($users));
  }
}
