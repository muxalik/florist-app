<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class NameFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $minLength = $request->min_name;
      $maxLength = $request->max_name;

      if ($minLength) {
         $query->whereRaw(
            'LENGTH(name) >= ?',
            $minLength
         );
      }

      if ($maxLength) {
         $query->whereRaw(
            'LENGTH(name) <= ?',
            $maxLength
         );
      }

      return FilterResultObj::create($request, $query);
   }
}
