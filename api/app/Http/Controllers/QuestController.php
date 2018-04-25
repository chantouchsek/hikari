<?php

namespace App\Http\Controllers;

use App\Http\Requests\Quest\StoreRequest;
use App\Http\Requests\Quest\UpdateRequest;
use App\Models\Quest;
use App\Transformers\QuestTransformer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;

class QuestController extends Controller
{
    /**
     * @var QuestTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * QuestController constructor.
     * @param QuestTransformer $transformer The transformer used to transform the model
     */
    public function __construct(QuestTransformer $transformer)
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

        $pagination = Quest::with(['user:id,name', 'user.store:id,name'])->paginate($this->getPagination());

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
        $quest = new Quest($request->except('date_term'));
        $quest->date_term = new Carbon($request->get('date_term'));
        $quest->user()->associate($request->get('user_id'));
        $quest->save();

        return $this->respondCreated('The Quest has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Quest $quest
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Quest $quest)
    {
        return $this->respond($this->transformer->transform($quest));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @param  \App\Models\Quest $quest
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, Quest $quest)
    {
        $quest->fill($request->except('date_term'));
        $quest->date_term = new Carbon($request->get('date_term'));
        $quest->user()->associate($request->get('user_id'));
        $quest->save();

        return $this->respondCreated('The Quest has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quest $quest
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Quest $quest)
    {
        $quest->delete();

        return $this->respondWithSuccess('The Quest has been deleted.');
    }
}
