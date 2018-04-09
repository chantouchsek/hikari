<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimeCard\StoreRequest;
use App\Http\Requests\TimeCard\UpdateRequest;
use App\Models\TimeCard;
use App\Transformers\TimeCardTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;

class TimeCardController extends Controller
{

  /**
   * @var TimeCardTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * UsersController constructor.
   * @param TimeCardTransformer $transformer The transformer used to transform the model
   */
  public function __construct(TimeCardTransformer $transformer)
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

    $pagination = TimeCard::with('user.store:id,name')->paginate($this->getPagination());

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
    $timeCard = new TimeCard($request->except('status'));
    $timeCard->status = $request->status;
    $timeCard->save();

    return $this->respondCreated('The Time card has been created.');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\TimeCard $timeCard
   * @return \Illuminate\Http\JsonResponse
   */
  public function show(TimeCard $timeCard)
  {
    return $this->respond($this->transformer->transform($timeCard));
  }


  /**
   * Update the specified resource in storage.
   *
   * @param  UpdateRequest $request
   * @param  \App\Models\TimeCard $timeCard
   * @return \Illuminate\Http\JsonResponse
   */
  public function update(UpdateRequest $request, TimeCard $timeCard)
  {
    $timeCard->fill($request->except('status'));
    $timeCard->status = $request->status;
    $timeCard->save();

    return $this->respondCreated('The Time card has been updated.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\TimeCard $timeCard
   * @return \Illuminate\Http\JsonResponse
   * @throws \Exception
   */
  public function destroy(TimeCard $timeCard)
  {
    $timeCard->delete();

    return $this->respondWithSuccess('The Time card has been updated.');
  }
}
