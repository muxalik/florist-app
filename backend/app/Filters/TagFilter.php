<?php

namespace App\Filters;

use App\Actions\Filters\IdFilter;
use App\Actions\Filters\CreatedAtFilter;
use App\Actions\Filters\NameFilter;
use App\Actions\Filters\UpdatedAtFilter;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TagFilter extends AbstractFilter
{
   protected array $filters = [
      IdFilter::class,
      NameFilter::class,
      UpdatedAtFilter::class,
      CreatedAtFilter::class,
   ];


   public function __construct(Request $request)
   {
      parent::__construct($request, perPage: 12);

      $this->query = Tag::with('color')->withCount('products');
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
               ->orWhereHas('color', function (Builder $q): Builder {
                  return $q
                     ->where('id', 'LIKE', "%$this->q%")
                     ->orWhere('name', 'LIKE', "%$this->q%")
                     ->orWhere('hex', 'LIKE', "%$this->q%");
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
               $this->order
            );

            break;

         case 'parentName':
            $this->query->orderBy('parent_id', $this->order);

            break;

         default:
            $this->query->latest('id');
      }

      return $this;
   }
}
