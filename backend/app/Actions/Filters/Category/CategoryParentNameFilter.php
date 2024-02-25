<?php

namespace App\Actions\Filters\Category;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryParentNameFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $minLength = $request->parent_min;
      $maxLength = $request->parent_max;

      if ($minLength) {
         $query->whereHas('parent', function (Builder $q) use ($minLength) {
            $q->whereRaw(
               'LENGTH(name) >= ?',
               $minLength
            );
         });
      }

      if ($maxLength) {
         $query->whereHas('parent', function (Builder $q) use ($maxLength) {
            $q->whereRaw(
               'LENGTH(name) <= ?',
               $maxLength
            );
         });
      }

      return FilterResultObj::create($request, $query);
   }
}
