<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Transformers\PostTransformer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class PostController extends Controller
{
    /**
     * @var PostTransformer The transformer used to transform the model.
     */
    protected $transformer;

    /**
     * UsersController constructor.
     * @param PostTransformer $transformer The transformer used to transform the model
     */
    public function __construct(PostTransformer $transformer)
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

        $pagination = Post::paginate($this->getPagination());

        $schedulepost = $this->transformer->transformCollection(collect($pagination->items()));

        return $this->respondWithPagination($pagination, [
            'data' => $schedulepost
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
        $post = new Post($request->except('scheduled_at'));
        $post->scheduled_at = new Carbon($request->get('scheduled_at'));
        $post->save();

        return $this->respondCreated('The post has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        return $this->respond($this->transformer->transform($post));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Post $post)
    {
        $post->fill($request->except('scheduled_at'));
        $post->scheduled_at = new Carbon($request->get('scheduled_at'));

        $post->save();

        return $this->respondCreated('The Post has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return $this->respondWithSuccess('The Post has been deleted');
    }

    public function draftPost()
    {
        if (Input::get('limit')) {
            $this->setPagination(Input::get('limit'));
        }

        $pagination = Post::with('user')
            ->where('status', 0)
            ->paginate($this->getPagination());

        $draftPost = $this->transformer->transformCollection(collect($pagination->items()));

        return $this->respondWithPagination($pagination, [
            'data' => $draftPost
        ]);
    }
}
