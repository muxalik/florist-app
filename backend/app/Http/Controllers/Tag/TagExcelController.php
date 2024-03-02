<?php

namespace App\Http\Controllers\Tag;

use App\Exports\TagsExport;
use App\Filters\TagFilter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TagExcelController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): BinaryFileResponse
    {
        $tags = (new TagFilter($request))
            ->apply(true);

        return (new TagsExport($tags))
            ->download('tags.xlsx');
    }
}
