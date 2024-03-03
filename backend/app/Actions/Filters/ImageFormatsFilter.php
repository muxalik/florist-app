<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ImageFormatsFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $formats = collect($request->formats
         ? explode(',', $request->formats)
         : []);

      if ($formats->isNotEmpty()) {
         $query->whereHas('image', function (Builder $q) use ($formats) {
            $q->where(function (Builder $q) use ($formats) {
               $formats->each(function (string $format) use ($q) {
                  $q->orWhere('filename', 'LIKE', '%.' . $format);
               });
            });
         });
      }

      return FilterResultObj::create($request, $query);
   }
}
