<?php

namespace App\Filters;

use App\Actions\Filters\Category\CategoryHasImageFilter;
use App\Actions\Filters\IdFilter;
use App\Actions\Filters\Category\CategoryImageFormatsFilter;
use App\Actions\Filters\NameFilter;
use App\Actions\Filters\Category\CategoryParentNameFilter;
use App\Actions\Filters\CreatedAtFilter;
use App\Actions\Filters\UpdatedAtFilter;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryFilter extends AbstractFilter
{
   protected array $filters = [
      IdFilter::class,
      CategoryHasImageFilter::class,
      CategoryImageFormatsFilter::class,
      NameFilter::class,
      CategoryParentNameFilter::class,
      UpdatedAtFilter::class,
      CreatedAtFilter::class,
   ];


   public function __construct(Request $request)
   {
      parent::__construct($request);

      $this->query = Category::with('image', 'parent');
   }

   protected function search(): self
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

   protected function sort(): self
   {
      switch ($this->sort) {
         case 'id':
         case 'name':
         case 'createdAt':
         case 'updatedAt':
            $this->query->orderBy(
               str($this->sort)->snake(),
               $this->order->value
            );

            break;

         case 'parentName':
            $this->query->orderBy('parent_id', $this->order->value);

            break;

         default:
            $this->query->latest('id');
      }

      return $this;
   }
}
