<?php

namespace App\Filters;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryFilter
{
   protected readonly ?int $page;

   protected readonly ?int $perPage;

   protected readonly ?string $q;

   protected readonly ?bool $hasChldren;

   protected readonly ?bool $hasImage;

   protected readonly ?string $sort;

   protected readonly ?string $order;

   protected Builder $query;

   public function __construct(Request $request)
   {
      $this->page = $request->page;
      $this->perPage = $request->per_page ?? 10;
      $this->q = $request->q;
      $this->hasChldren = $request->boolean('children');
      $this->hasImage = $request->boolean('image');
      $this->sort = $request->sort;
      $this->order = $request->order ?? 'asc';

      $this->query = Category::with('image', 'parent');
   }

   public function apply(): LengthAwarePaginator
   {
      return $this
         ->search()
         ->sort()
         // ->filter()
         ->paginate();
   }

   private function search(): self
   {
      if (!$this->q) {
         return $this;
      }

      $this->query
         ->where(function (Builder $q): Builder {
            return $q
               ->where('id', 'LIKE', "%$this->q%")
               ->orWhere('name', 'LIKE', "%$this->q%")
               ->orWhereHas('parent', function (Builder $q): Builder {
                  return $q
                     ->where('id', 'LIKE', "%$this->q%")
                     ->orWhere('name', 'LIKE', "%$this->q%");
               });
         });

      return $this;
   }

   private function sort(): self
   {
      if (!$this->sort) {
         return $this;
      }

      if (in_array($this->sort, ['id', 'name', 'createdAt', 'updatedAt'])) {
         $this->query->orderBy(
            str($this->sort)->snake(),
            $this->order
         );
      }

      if ($this->sort === 'parentName') {
         $this->query->orderBy('parent_id', $this->order);
      }

      return $this;
   }

   private function paginate(): LengthAwarePaginator
   {
      return $this->query->paginate(
         perPage: $this->perPage,
         page: $this->page
      );
   }
}
