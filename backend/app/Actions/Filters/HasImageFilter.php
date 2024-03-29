<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class HasImageFilter
{
   public static function handle(
      Request $request,
      Builder $query
   ): FilterResultObj {
      $hasImage =  $request->has_image;

      switch ($hasImage) {
         case 'yes':
            $query->whereNotNull('image_id');
            break;

         case 'no':
            $query->whereNull('image_id');
            break;
      }

      return FilterResultObj::create($request, $query);
   }
}
