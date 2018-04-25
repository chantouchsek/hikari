<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Transformers\GroupTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class GroupController extends Controller
{
    /**
     * @var GroupTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * GroupsController constructor.
     * @param GroupTransformer $transformer The transformer used to transform the model
     */
    public function __construct(GroupTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        if (Input::get('limit')) {
            $this->setPagination(Input::get('limit'));
        }

        $pagination = Group::paginate($this->getPagination());

        $data = $this->transformer->transformCollection(collect($pagination->items()));

        return $this->respondWithPagination($pagination, [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $group = new Group($request->all());
        $group->save();

        return $this->respondCreated('The group has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group $group
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Group $group)
    {
        return $this->respond($this->transformer->transform($group));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Group $group
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Group $group)
    {
        $group->fill($request->all());
        $group->save();
        return $this->respondCreated('The group has been updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group $group
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Group $group)
    {
        $group->delete();
        return $this->respondWithSuccess('The group has been deleted.');
    }
}
