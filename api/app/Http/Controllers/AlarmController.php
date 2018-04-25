<?php

namespace App\Http\Controllers;

use App\Http\Requests\Alarm\StoreRequest;
use App\Http\Requests\Alarm\UpdateRequest;
use App\Models\Alarm;
use App\Transformers\AlarmTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AlarmController extends Controller
{
    /**
     * @var AlarmTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * UsersController constructor.
     * @param AlarmTransformer $transformer The transformer used to transform the model
     */
    public function __construct(AlarmTransformer $transformer)
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

        $pagination = Alarm::paginate($this->getPagination());

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
        $alarm = new Alarm($request->except('recipients'));

        if ($request->recipient === '1') {
            $alarm->recipients = 1;
        }

        $alarm->save();

        $users = collect(request('recipients'));
        if ($request->recipient === '2') {
            $alarm->positions()->attach($users);
        }

        if ($request->recipient === '3') {
            $alarm->users()->attach($users);
        }

        return $this->respondCreated('The alarm has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Alarm $alarm
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Alarm $alarm)
    {
        return $this->respond($this->transformer->transform($alarm));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @param  \App\Models\Alarm $alarm
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, Alarm $alarm)
    {
        $alarm->fill($request->except('recipients'));
        if ($request->recipient === '1') {
            $alarm->recipients = 1;
        }

        $users = collect(request('recipients'));
        if ($request->recipient === '2') {
            $alarm->positions()->sync($users);
        }

        if ($request->recipient === '3') {
            $alarm->users()->sync($users);
        }

         $alarm->save();

        return $this->respondCreated('The alarm has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Alarm $alarm
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Alarm $alarm)
    {
        $alarm->delete();
        return $this->respondWithSuccess('The alarm has been deleted.');
    }
}
