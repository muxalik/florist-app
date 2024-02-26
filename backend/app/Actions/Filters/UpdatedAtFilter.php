<?php

namespace App\Actions\Filters;

use App\ValueObjects\FilterResultObj;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UpdatedAtFilter
{
   public static function handle(
      Request $request,
      Builder $query,
   ): FilterResultObj {
      $from = $request->updated_from;
      $to = $request->updated_to;

      if ($from) {
         $date = Carbon::createFromFormat('m-d-Y', $from);

         $query->where('updated_at', '>=', $date);
      }

      if ($to) {
         $date = Carbon::createFromFormat('m-d-Y', $to)
            ->setHours(23)
            ->setMinutes(59)
            ->setSeconds(59);

         $query->where('updated_at', '<=', $date);
      }

      return FilterResultObj::create($request, $query);
   }
}
