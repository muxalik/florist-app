<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TagsExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
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

    public function map($tag): array
    {
        return [
            $tag->id,
            $tag->name,
            $tag->color?->name ?? __('tag.no-color'),
            $tag->created_at->translatedFormat(config('app.date_format')),
            $tag->updated_at->translatedFormat(config('app.date_format')),
        ];
    }
    public function headings(): array
    {
        return [
            __('tag.excel.id'),
            __('tag.excel.name'),
            __('tag.excel.color'),
            __('tag.excel.created_at'),
            __('tag.excel.updated_at'),
        ];
    }
}
