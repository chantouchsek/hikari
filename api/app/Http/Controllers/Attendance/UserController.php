<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Requests\Attendance\ShowRequest;
use App\Models\Attendance;
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
   * @param Attendance $attendance
   *
   * @return JsonResponse
   */
  public function show(ShowRequest $request, Attendance $attendance): JsonResponse
  {
    $user = $attendance->user;

    return $this->respond($this->transformer->transform($user));
  }
}
