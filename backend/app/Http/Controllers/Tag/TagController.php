<?php

namespace App\Http\Controllers\Tag;

use App\Filters\TagFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\UpstoreTagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;

class TagController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        return TagResource::collection(
            (new TagFilter($request))->apply()
        );
    }

    // public function list(): AnonymousResourceCollection
    // {
    //     return ListTagResource::collection(
    //         Category::latest('id')->get(),
    //     );
    // }

    public function store(UpstoreTagRequest $request): JsonResponse
    {
        $tag = Tag::create($request->validated());

        if (!$tag) {
            return response()->json([
                'message' => __('tag.errors.store'),
            ]);
        }

        return response()->json([
            'message' => __('tag.created'),
        ]);
    }

    public function update(UpstoreTagRequest $request, Tag $tag): JsonResponse
    {
        $tag->update($request->validated());

        return response()->json([
            'message' => __('tag.updated'),
        ]);
    }

    public function destroy(Tag $tag): JsonResponse
    {
        $tag->delete();

        return response()->json([
            'message' => __('tag.deleted'),
        ]);
    }
}
