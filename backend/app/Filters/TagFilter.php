<?php

namespace App\Filters;

use App\Actions\Filters\ColorFilter;
use App\Actions\Filters\Tag\TagProductsFilter;
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
      ColorFilter::class,
      TagProductsFilter::class,
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
               $this->order->value,
            );

            break;

         case 'color':
            $this->query->orderBy(
               'color_id',
               $this->order->value
            );

            break;

         case 'productsCount':
            $this->query->orderBy(
               'products_count',
               $this->order->value
            );

            break;

         default:
            $this->query->latest('id');
      }

      return $this;
   }
}
