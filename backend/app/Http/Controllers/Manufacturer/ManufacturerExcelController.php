<?php

namespace App\Http\Controllers\Category;

use App\Exports\ManufacturersExport;
use App\Filters\ManufacturerFilter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ManufacturerExcelController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): BinaryFileResponse
    {
        $manufacturers = (new ManufacturerFilter($request))
            ->apply(true);

        return (new ManufacturersExport($manufacturers))
            ->download('manufacturers.xlsx');
    }
}
