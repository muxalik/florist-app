<?php

namespace App\Filters;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CategoryFilter
{
   protected readonly ?int $page;

   protected readonly ?int $perPage;

   protected readonly ?string $q;

   // protected readonly ?bool $hasChldren;

   protected readonly ?string $hasImage;

   protected readonly Collection $formats;

   protected readonly ?string $sort;

   protected readonly ?string $order;

   protected Builder $query;

   public function __construct(Request $request)
   {
      $this->page = $request->page;
      $this->perPage = $request->per_page ?? 10;
      $this->q = $request->q;
      // $this->hasChldren = $request->boolean('children');
      $this->hasImage = $request->has_image;
      $this->formats = collect($request->formats
         ? explode(',', $request->formats)
         : []);
      $this->sort = $request->sort;
      $this->order = $request->order ?? 'asc';

      $this->query = Category::with('image', 'parent');
   }

   public function apply(): LengthAwarePaginator
   {
      return $this
         ->search()
         ->sort()
         ->filter()
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
      if (in_array($this->sort, ['id', 'name', 'createdAt', 'updatedAt'])) {
         $this->query->orderBy(
            str($this->sort)->snake(),
            $this->order
         );

         return $this;
      }

      if ($this->sort === 'parentName') {
         $this->query->orderBy('parent_id', $this->order);

         return $this;
      }

      $this->query->latest('id');

      return $this;
   }

   private function filter(): self
   {
      switch ($this->hasImage) {
         case 'yes':
            $this->query->whereNotNull('image_id');
            break;

         case 'no':
            $this->query->whereNull('image_id');
            break;
      }

      if ($this->formats->isNotEmpty()) {
         $this->query->whereHas('image', function (Builder $q) {
            $q->where(function (Builder $q) {
               $this->formats->each(function (string $format) use ($q) {
                  $q->orWhere('filename', 'LIKE', '%.' . $format);
               });
            });
         });
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
