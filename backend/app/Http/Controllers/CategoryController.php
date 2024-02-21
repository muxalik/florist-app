<?php

namespace App\Http\Controllers;

use App\Enums\Files;
use App\Filters\CategoryFilter;
use App\Http\Requests\Category\UpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ListCategoryResource;
use App\Models\Category;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CategoryController extends Controller
{

    public function updateImage(Request $request, Category $category): Response
    {
        if (!$request->hasFile('image')) {
            $category->update(['image_id' => null]);

            return response()->noContent();
        }

        $path = 'categories';

        $fullPath = $request->file('image')
            ->store('public/' . $path);

        $filename = str($fullPath)->afterLast('/');

        $category->image()?->delete();

        $file = File::create([
            'path' => $path,
            'filename' => $filename,
            'type' => Files::Image->value,
        ]);

        $category->update(['image_id' => $file->id]);

        return response()->noContent();
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return CategoryResource::collection(
            (new CategoryFilter($request))->apply()
        );
    }

    public function list(): AnonymousResourceCollection
    {
        return ListCategoryResource::collection(
            Category::latest('id')->get(),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateRequest $request,
        Category $category
    ): JsonResponse {
        $category->update($request->validated());

        return response()->json([
            'message' => __('category.updated'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json([
            'message' => __('category.deleted'),
        ]);
    }
}
