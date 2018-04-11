<?php

namespace App\Http\Controllers\DailyReport;

use App\Http\Requests\Attendance\ShowRequest;
use App\Models\DailyReport;
use App\Transformers\BranchTransformer;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class BranchController extends Controller
{
  /**
   * @var BranchTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * The constructor for the controller.
   *
   * @param BranchTransformer $transformer The transformer used to transform the model.
   */
  public function __construct(BranchTransformer $transformer)
  {
    $this->transformer = $transformer;
  }

  /**
   * Display the specified resource.
   *
   * @param ShowRequest $request
   * @param DailyReport $dailyReport
   *
   * @return JsonResponse
   */
  public function show(ShowRequest $request, DailyReport $dailyReport): JsonResponse
  {
    $branch = $dailyReport->branch;

    return $this->respond($this->transformer->transform($branch));
  }
}
