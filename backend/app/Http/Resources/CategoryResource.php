<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'image' => $this->whenLoaded(
                'image',
                $this->image->full_path
            ),
            'parentId' => $this->parent?->id,
            'parentName' => $this->parent?->name,
            'createdAt' => $this->created_at->format(config('app.date_format')),
            'updatedAt' => $this->updated_at->format(config('app.date_format')),
        ];
    }
}
