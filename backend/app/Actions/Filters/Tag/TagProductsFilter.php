<?php

namespace App\Actions\Filters\Tag;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TagProductsFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $min = $request->min_products;
      $max = $request->max_products;

      if ($min) {
         $query->has('products', '>=', $min);
      }

      if ($max) {
         $query->has('products', '<=', $max);
      }

      return FilterResultObj::create($request, $query);
   }
}
