<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'color' => $this->color ? [
                'id' => $this->color?->id,
                'hex' => $this->color?->hex,
                'name' => $this->color?->name,
            ] : null,
            'productsCount' => $this->whenCounted('products', $this->products_count),
            'createdAt' => $this->created_at->translatedFormat(config('app.date_format')),
            'updatedAt' => $this->updated_at->translatedFormat(config('app.date_format')),
        ];
    }
}
