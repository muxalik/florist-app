<?php

namespace App\Filters;

use App\Enums\SortOrder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

abstract class AbstractFilter
{
   protected Request $request;
   protected Builder $query;

   // Pagination 
   protected readonly ?int $page;
   protected readonly ?int $perPage;

   // Search 
   protected readonly ?string $q;

   // Sorting
   protected readonly ?string $sort;
   protected readonly ?SortOrder $order;

   protected array $filters;

   public function __construct(
      Request $request,
      int $page = 1,
      int $perPage = 10,
      string $q = '',
      string $sort = '',
      SortOrder $order = SortOrder::Asc,
   ) {
      // Pagination 
      $this->page = $request->page ?? $page;
      $this->perPage = $request->per_page ?? $perPage;

      // Search 
      $this->q = $request->q ?? $q;

      // Sorting 
      $this->sort = $request->sort ?? $sort;
      $this->order = $request->order ?? $order;

      $this->request = $request;
   }


   public function apply(): LengthAwarePaginator
   {
      return $this
         ->search()
         ->sort()
         ->filter()
         ->paginate();
   }

   abstract protected function search(): self;

   abstract protected function sort(): self;

   protected function filter(): self
   {
      foreach ($this->filters as $className) {
         $filter = $className::handle($this->request, $this->query);

         $this->request = $filter->request;
         $this->query = $filter->query;
      }

      return $this;
   }

   protected function paginate(): LengthAwarePaginator
   {
      return $this->query->paginate(
         perPage: $this->perPage,
         page: $this->page
      );
   }
}
