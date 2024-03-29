<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class IdFilter
{
   public static function handle(
      Request $request,
      Builder $query
   ): FilterResultObj {
      $id = $request->id;

      switch ($id) {
         case 'odd':
            $query->whereRaw('MOD(id, 2) <> 0');
            break;

         case 'even':
            $query->whereRaw('MOD(id, 2) = 0');
            break;
      }

      return FilterResultObj::create($request, $query);
   }
}
