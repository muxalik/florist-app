<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ColorFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $withoutColor = $request->without_color;
      $colors = $request->colors ?? '';

      $colors = strlen($colors)
         ? explode(',', $colors)
         : [];

      $query->where(function (Builder $q) use ($withoutColor, $colors) {
         if ($withoutColor) {
            $q->whereDoesntHave('color');
         }

         if (count($colors)) {
            $q->orWhereIn('color_id', $colors);
         }
      });

      return FilterResultObj::create($request, $query);
   }
}
