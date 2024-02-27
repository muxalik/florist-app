<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CategoriesExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
{
    use Exportable;

    public function __construct(
        protected Builder $query
    ) {
    }

    public function query()
    {
        return $this->query;
    }

    public function map($category): array
    {
        return [
            $category->id,
            $category->image?->full_path,
            $category->name,
            $category->parent?->name ?? __('category.no-parent-name'),
            $category->created_at->translatedFormat(config('app.date_format')),
            $category->updated_at->translatedFormat(config('app.date_format')),
        ];
    }

    public function headings(): array
    {
        return [
            __('category.excel.id'),
            __('category.excel.image'),
            __('category.excel.name'),
            __('category.excel.parent'),
            __('category.excel.created_at'),
            __('category.excel.updated_at'),
        ];
    }
}
