<?php

namespace App\Http\Controllers\Category;

use App\Filters\CategoryFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\UpstoreRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ListCategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use App\ValueObjects\Category\StoreCategoryObj;
use App\ValueObjects\Category\UpdateCategoryImageObj;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CategoryController extends Controller
{
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

    public function updateImage(
        Request $request,
        Category $category,
        CategoryService $service,
    ): Response {
        $obj = UpdateCategoryImageObj::create(
            category: $category,
            image: $request->file('image')
        );

        try {
            $service::updateImage($obj);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }

        return response()->noContent();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        UpstoreRequest $request,
        CategoryService $service
    ): JsonResponse {
        $obj = StoreCategoryObj::create(
            fields: $request->validated(),
            image: $request->file('image'),
        );

        try {
            $service::store($obj);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => __('category.created'),
        ]);
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
        UpstoreRequest $request,
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
