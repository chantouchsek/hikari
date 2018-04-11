<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attendance\StoreRequest;
use App\Http\Requests\Attendance\UpdateRequest;
use App\Models\Attendance;
use App\Transformers\AttendanceTransformer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;

class AttendanceController extends Controller
{
  /**
   * @var AttendanceTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * UsersController constructor.
   * @param AttendanceTransformer $transformer The transformer used to transform the model
   */
  public function __construct(AttendanceTransformer $transformer)
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

    $pagination = Attendance::with('user:id,name')->paginate($this->getPagination());

    $data = $this->transformer->transformCollection(collect($pagination->items()));

    return $this->respondWithPagination($pagination, [
      'data' => $data
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
    $attendance = new Attendance($request->all());
    //$attendance->reported_at = new Carbon($request->get('reported_at'));
    $attendance->save();

    return $this->respondCreated('The attendance has been updated.');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Attendance $attendance
   * @return \Illuminate\Http\JsonResponse
   */
  public function show(Attendance $attendance)
  {
    return $this->respond($this->transformer->transform($attendance));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  UpdateRequest $request
   * @param  \App\Models\Attendance $attendance
   * @return \Illuminate\Http\JsonResponse
   */
  public function update(UpdateRequest $request, Attendance $attendance)
  {
    $attendance->fill($request->except(['start_time', 'leave_time', 'break_start', 'break_finish']));
    $attendance->start_time = new Carbon($request->get('start_time'));
    $attendance->leave_time = new Carbon($request->get('leave_time'));
    $attendance->break_start = new Carbon($request->get('break_start'));
    $attendance->break_finish = new Carbon($request->get('break_finish'));
    $attendance->save();

    return $this->respondCreated('The attendance has been updated.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Attendance $attendance
   * @return \Illuminate\Http\JsonResponse
   * @throws \Exception
   */
  public function destroy(Attendance $attendance)
  {
    $attendance->delete();

    return $this->respondWithSuccess('The attendance has been deleted.');
  }
}
