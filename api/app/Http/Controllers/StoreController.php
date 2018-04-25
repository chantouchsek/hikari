<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\ShowRequest;
use App\Http\Requests\Store\StoreRequest;
use App\Http\Requests\Store\UpdateRequest;
use App\Models\Store;
use App\Transformers\StoreTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class StoreController extends Controller
{
    /**
     * @var StoreTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * DepartmentsController constructor.
     * @param StoreTransformer $transformer The transformer used to transform the model
     */
    public function __construct(StoreTransformer $transformer)
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

        $pagination = Store::paginate($this->getPagination());

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
        $store = new Store($request->except('status'));
        $store->status = $request->status === true ? 1 : 0;
        $store->save();
        return $this->respondCreated('The store has been created');
    }

    /**
     * Display the specified resource.
     *
     * @param ShowRequest $request
     * @param  \App\Models\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ShowRequest $request, Store $store): JsonResponse
    {
        return $this->respond($this->transformer->transform($store));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @param  \App\Models\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, Store $store)
    {
        $store->fill($request->except('status'));
        $store->status = $request->status === true ? 1 : 0;
        $store->save();
        return $this->respondCreated('The Store has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Store $store
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Store $store)
    {
        $store->delete();
        return $this->respondWithSuccess('The Store has been deleted.');
    }
}
