<?php

namespace App\Filters;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class CategoryFilter
{
   protected readonly ?int $page;

   protected readonly ?int $perPage;

   protected readonly ?string $q;

   protected readonly ?string $id;

   protected readonly ?string $hasImage;

   protected readonly Collection $formats;

   protected readonly ?string $sort;

   protected readonly ?string $order;

   protected readonly ?int $minName;

   protected readonly ?int $maxName;

   protected readonly ?int $parentMin;

   protected readonly ?int $parentMax;

   protected readonly ?string $updatedFrom;

   protected readonly ?string $updatedTo;

   protected Builder $query;

   public function __construct(Request $request)
   {
      $this->page = $request->page;

      $this->perPage = $request->per_page ?? 10;

      $this->q = $request->q;

      $this->id = $request->id;

      $this->hasImage = $request->has_image;

      $this->formats = collect($request->formats
         ? explode(',', $request->formats)
         : []);

      $this->sort = $request->sort;

      $this->order = $request->order ?? 'asc';

      $this->minName = $request->min_name;

      $this->maxName = $request->max_name;

      $this->parentMin = $request->parent_min;

      $this->parentMax = $request->parent_max;

      $this->updatedFrom = $request->updated_from;

      $this->updatedTo = $request->updated_to;

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
      $this->idFilter();
      $this->hasImageFilter();
      $this->formatsFilter();
      $this->nameFilter();
      $this->parentNameFilter();
      $this->updatedAtFilter();

      return $this;
   }

   private function idFilter(): void
   {
      switch ($this->id) {
         case 'odd':
            $this->query->whereRaw('MOD(id, 2) <> 0');
            break;

         case 'even':
            $this->query->whereRaw('MOD(id, 2) = 0');
            break;
      }
   }

   private function hasImageFilter(): void
   {
      switch ($this->hasImage) {
         case 'yes':
            $this->query->whereNotNull('image_id');
            break;

         case 'no':
            $this->query->whereNull('image_id');
            break;
      }
   }

   private function formatsFilter(): void
   {
      if ($this->formats->isNotEmpty()) {
         $this->query->whereHas('image', function (Builder $q) {
            $q->where(function (Builder $q) {
               $this->formats->each(function (string $format) use ($q) {
                  $q->orWhere('filename', 'LIKE', '%.' . $format);
               });
            });
         });
      }
   }

   private function nameFilter(): void
   {
      // Minimal name length 
      if ($this->minName) {
         $this->query->whereRaw(
            'LENGTH(name) >= ?',
            $this->minName
         );
      }

      // Maximum name length 
      if ($this->maxName) {
         $this->query->whereRaw(
            'LENGTH(name) <= ?',
            $this->maxName
         );
      }
   }

   private function parentNameFilter(): void
   {
      // Minimal name length 
      if ($this->parentMin) {
         $this->query->whereHas('parent', function (Builder $q) {
            $q->whereRaw(
               'LENGTH(name) >= ?',
               $this->parentMin
            );
         });
      }

      // Maximum name length 
      if ($this->parentMax) {
         $this->query->whereHas('parent', function (Builder $q) {
            $q->whereRaw(
               'LENGTH(name) <= ?',
               $this->parentMax
            );
         });
      }
   }

   private function updatedAtFilter(): void
   {
      if ($this->updatedFrom) {
         $date = Carbon::createFromFormat('m-d-Y', $this->updatedFrom);

         Log::alert('FROM', [$date->toDateTimeString()]);

         $this->query->where('updated_at', '>=', $date);
      }
   }

   private function paginate(): LengthAwarePaginator
   {
      return $this->query->paginate(
         perPage: $this->perPage,
         page: $this->page
      );
   }
}
