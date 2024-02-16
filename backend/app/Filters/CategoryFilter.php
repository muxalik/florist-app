<?php

namespace App\Filters;

use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryFilter
{
   protected readonly ?int $page;

   protected readonly ?int $perPage;

   protected readonly ?string $q;

   protected readonly ?bool $hasChldren;

   protected readonly ?bool $hasImage;

   protected Builder $query;

   public function __construct(Request $request)
   {
      $this->page = $request->page;
      $this->perPage = $request->per_page;
      $this->q = $request->q;
      $this->hasChldren = $request->boolean('children');
      $this->hasImage = $request->boolean('image');

      $this->query = Category::with('image', 'parent');
   }

   public function apply(): Builder
   {
      return $this
         ->search()
         // ->filter()
         // ->paginate()
      ;
   }

   private function search(): Builder
   {
      if (!$this->q) {
         return $this->query;
      }

      return $this->query
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
   }
}
