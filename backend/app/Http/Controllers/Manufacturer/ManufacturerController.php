<?php

namespace App\Http\Controllers\Manufacturer;

use App\Filters\ManufacturerFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Manufacturer\UpstoreManufacturerRequest;
use App\Http\Resources\ManufacturerResource;
use App\Models\Manufacturer;
use App\Services\ManufacturerService;
use App\ValueObjects\Manufacturer\StoreManufacturerObj;
use App\ValueObjects\Manufacturer\UpdateManufacturerImageObj;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ManufacturerController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        return ManufacturerResource::collection(
            (new ManufacturerFilter($request))->apply(),
        );
    }

    public function updateImage(
        Request $request,
        Manufacturer $manufacturer,
        ManufacturerService $service,
    ): Response {
        $obj = UpdateManufacturerImageObj::create(
            manufacturer: $manufacturer,
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

    public function store(
        UpstoreManufacturerRequest $request,
        ManufacturerService $service
    ): JsonResponse {
        $obj = StoreManufacturerObj::create(
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
            'message' => __('manufacturer.created'),
        ]);
    }

    public function update(
        UpstoreManufacturerRequest $request,
        Manufacturer $manufacturer
    ): JsonResponse {
        $manufacturer->update($request->validated());

        return response()->json([
            'message' => __('manufacturer.updated'),
        ]);
    }

    public function destroy(Manufacturer $manufacturer): JsonResponse
    {
        $manufacturer->delete();

        return response()->json([
            'message' => __('manufacturer.deleted'),
        ]);
    }
}
