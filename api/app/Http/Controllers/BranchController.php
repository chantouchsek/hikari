<?php

namespace App\Http\Controllers;

use App\Http\Requests\Branch\StoreRequest;
use App\Http\Requests\Branch\UpdateRequest;
use App\Models\Branch;
use App\Transformers\BranchTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

class BranchController extends Controller
{
  /**
   * @var BranchTransformer The transformer used to transform the model.
   */
  protected $transformer;

  /**
   * UsersController constructor.
   * @param BranchTransformer $transformer The transformer used to transform the model
   */
  public function __construct(BranchTransformer $transformer)
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

    $pagination = Branch::paginate($this->getPagination());

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
    $branch = new Branch($request->except('thumbnail_id'));
    $this->upload($request, $branch);
    $branch->save();

    return $this->respondCreated('The Branch has been created.');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Branch $branch
   * @return \Illuminate\Http\JsonResponse
   */
  public function show(Branch $branch)
  {
    return $this->respond($this->transformer->transform($branch));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  UpdateRequest $request
   * @param  \App\Models\Branch $branch
   * @return \Illuminate\Http\JsonResponse
   */
  public function update(UpdateRequest $request, Branch $branch)
  {
    $branch->fill($request->except('thumbnail_id'));
    $this->upload($request, $branch);
    $branch->save();

    return $this->respondCreated('The Branch has been updated.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Branch $branch
   * @return \Illuminate\Http\JsonResponse
   * @throws \Exception
   */
  public function destroy(Branch $branch)
  {
    $branch->delete();

    return $this->respondWithSuccess('The Branch has been deleted.');
  }

  /**
   * @param $request
   * @param Branch $branch
   */
  public function upload($request, Branch $branch)
  {
    if ($request->get('thumbnail_id')) {
      $exploded = explode(',', $request->thumbnail_id);
      if (count($exploded) > 1) {
        $decoded = base64_decode($exploded[1], true);
        $f = finfo_open();
        $mime_type = finfo_buffer($f, $decoded, FILEINFO_MIME_TYPE);
        if (str_contains($exploded[0], 'jpeg') || str_contains($exploded[0], 'jpg')) {
          $extension = 'jpeg';
        } else {
          $extension = 'png';
        }
        $fileName = str_random() . '.' . $extension;
        if ($fileName) {
          $branch->storeMediaLibraryByPost($fileName, $mime_type, $fileName);
          $storage_path = storage_path("app/public/uploads/media/");
          if (!file_exists($storage_path)) {
            mkdir($storage_path, 0777, true);
          }
          $path = $storage_path . $fileName;
          file_put_contents($path, $decoded);
        }
      }
    }
  }
}
