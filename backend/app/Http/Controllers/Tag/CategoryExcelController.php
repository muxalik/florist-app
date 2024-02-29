<?php

namespace App\Http\Controllers\Category;

use App\Exports\CategoriesExport;
use App\Filters\CategoryFilter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CategoryExcelController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): BinaryFileResponse
    {
        $categories = (new CategoryFilter($request))
            ->apply(true);

        return (new CategoriesExport($categories))
            ->download('categories.xlsx');
    }
}
