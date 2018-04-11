<?php

namespace App\Http\Controllers;

use App\Http\Requests\DailyReport\StoreRequest;
use App\Http\Requests\DailyReport\UpdateRequest;
use App\Models\DailyReport;
use App\Transformers\DailyReportTransformer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;

class DailyReportController extends Controller
{
  /**
   * @var DailyReportTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * UsersController constructor.
   * @param DailyReportTransformer $transformer The transformer used to transform the model
   */
  public function __construct(DailyReportTransformer $transformer)
  {
    $this->transformer = $transformer;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index(): JsonResponse
  {
    if (Input::get('limit')) {
      $this->setPagination(Input::get('limit'));
    }

    $pagination = DailyReport::with('user:id,name')->paginate($this->getPagination());

    $users = $this->transformer->transformCollection(collect($pagination->items()));

    return $this->respondWithPagination($pagination, [
      'data' => $users
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  StoreRequest $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function store(StoreRequest $request)
  {
    $dailyReport = new DailyReport($request->except('date'));
    $dailyReport->date = new Carbon($request->get('date'));
    $dailyReport->save();

    return $this->respondCreated('The daily report has been updated.');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\DailyReport $dailyReport
   * @return \Illuminate\Http\JsonResponse
   */
  public function show(DailyReport $dailyReport)
  {
    return $this->respond($this->transformer->transform($dailyReport));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  UpdateRequest $request
   * @param  \App\Models\DailyReport $dailyReport
   * @return \Illuminate\Http\JsonResponse
   */
  public function update(UpdateRequest $request, DailyReport $dailyReport)
  {
    $dailyReport->fill($request->except('date'));
    $dailyReport->date = new Carbon($request->get('date'));
    $dailyReport->save();

    return $this->respondCreated('The daily report has been updated.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\DailyReport $dailyReport
   * @return \Illuminate\Http\JsonResponse
   * @throws \Exception
   */
  public function destroy(DailyReport $dailyReport)
  {
    $dailyReport->delete();

    return $this->respondWithSuccess('The daily report has been deleted.');
  }
}
