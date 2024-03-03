<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ManufacturersExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
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

    public function map($manufacturer): array
    {
        return [
            $manufacturer->id,
            $manufacturer->name,
            $manufacturer->image?->full_path ?? __('manufacturer.no-image'),
            $manufacturer->created_at->translatedFormat(config('app.date_format')),
            $manufacturer->updated_at->translatedFormat(config('app.date_format')),
        ];
    }

    public function headings(): array
    {
        return [
            __('manufacturer.excel.id'),
            __('manufacturer.excel.name'),
            __('manufacturer.excel.image'),
            __('manufacturer.excel.created_at'),
            __('manufacturer.excel.updated_at'),
        ];
    }
}
